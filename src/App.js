import "./App.css";
import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AddForm from "./components/Add";
import List from "./components/List";
import ModalUpdate from "./components/Modal";
import Background from "./bg/background";
import { getTodos } from "./config/getTodo";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config/firebase";

function App() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // Index todo yang sedang diedit
  const [newTodoName, setNewTodoName] = useState("");
  // untuk mengontrol tampilan modal
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedList, setIsCompletedList] = useState(
    todoList.map(() => false)
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodoList(todos);
      } catch (error) {
        // Tangani error di sini

        // Misalnya, tampilkan notifikasi error:
        toast.error("Gagal mengambil data todo. Coba lagi nanti.");
      }
    };

    fetchTodos();
  }, []);

  // memantau dan menampung inputan
  const handleChangeAdd = (e) => {
    const input = e.target.value;
    // penampungan input value
    setTodoName(input);
  };

  // menambahkan inputan ke list
  const AddTodo = () => {
    // ... (state todoName dan fungsi-fungsi lainnya)

    const handleAddNote = async () => {
      // Validasi input
      if (todoName.trim() === "") {
        toast.error("Todo cannot be empty", {
          position: "top-center",
          autoClose: 2000,
        });

        return;
      }

      // Definisikan dataTodo di sini
      const dataTodo = {
        todoName: todoName,
        status: false,
      };

      try {
        const docRef = await addDoc(collection(db, "to-do"), dataTodo); // Kirim dataTodo langsung ke addDoc

        // hasil dari add disimpan di docRef

        // Update state todoList setelah berhasil menambahkan data ke Firestore
        setTodoList([...todoList, { id: docRef.id, ...dataTodo }]);

        // Reset input todoName
        setTodoName("");

        // Tampilkan notifikasi sukses
        toast.success("Add todo succes", {
          position: "top-center",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed add todo. try again.");
      }
    };
    handleAddNote();
    // ... (JSX untuk input field dan tombol Add, pastikan memanggil handleAddNote saat tombol diklik)
  };

  // hapus Todo

  const deleteTodo = async (index) => {
    try {
      const todoId = todoList[index].id; // Ambil id todo dari todoList

      // Hapus dokumen dari Firestore
      await deleteDoc(doc(db, "to-do", todoId));

      // Hapus todo dari state todoList
      setTodoList(todoList.filter((_, idx) => index !== idx));

      // Tampilkan notifikasi sukses
      toast.success("Delete success", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      // Tampilkan notifikasi error
      toast.error("Gagal menghapus todo. Coba lagi nanti.");
    }
  };

  const handleChangeUpdate = (e) => {
    const data = e.target.value;
    setNewTodoName(data);
  };

  // proses edit/ta
  const startEditTodo = (index) => {
    // simpan index yg akan diedit
    setEditTodo(index);
    // isi input dengan todo yg akan diedit berdasarkan index dari list
    setNewTodoName(todoList[index].todoName);
    setShowModal(true); // Tampilkan modal saat tombol "Edit" diklik
  };

  const updateTodo = async () => {
    // Validasi input
    if (newTodoName.trim() === "") {
      toast.error("Cannot Empty, You should fill", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      // Ambil ID todo yang akan diupdate
      const todoId = todoList[editTodo].id;

      // Update dokumen di Firestore
      const todoRef = doc(db, "to-do", todoId);
      await updateDoc(todoRef, { todoName: newTodoName });

      // Update state noteList (opsional, jika kamu ingin langsung memperbarui tampilan)
      const updatedTodos = [...todoList];
      updatedTodos[editTodo].todoName = newTodoName;
      setTodoList(updatedTodos);

      // Reset field edit dan tutup modal
      setEditTodo(null);
      setNewTodoName("");
      setShowModal(false);

      // Tampilkan notifikasi sukses
      toast.success("Edit success", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Gagal mengupdate todo. Coba lagi nanti.");
    }
  };
  const finishTodo = async (index) => {
    try {
      const cloneTodoList = [...todoList];
      cloneTodoList[index].status = !cloneTodoList[index].status;

      // Ambil ID todo yang akan diupdate
      const todoId = todoList[index].id;

      // Update dokumen di Firestore
      const todoRef = doc(db, "to-do", todoId);
      await updateDoc(todoRef, { status: cloneTodoList[index].status });

      // Update state
      setTodoList(cloneTodoList);
      setIsCompletedList((prevList) => {
        const newList = [...prevList];
        newList[index] = cloneTodoList[index].status;
        return newList;
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Gagal mengupdate status todo. Coba lagi nanti.");
    }
  };
  // tombol enter untuk todo

  return (
    <div>
      <Background />
      <Container className="mx-auto">
        <ToastContainer />

        {/* Add */}
        <AddForm
          AddTodo={AddTodo}
          handleChangeAdd={handleChangeAdd}
          todoName={todoName}
        />

        {/* List */}
        <List
          todoList={todoList}
          finishTodo={finishTodo}
          deleteTodo={deleteTodo}
          startEditTodo={startEditTodo}
          isCompleted={isCompleted}
          isCompletedList={isCompletedList}
        />

        {/* input update */}
        <ModalUpdate
          setShowModal={setShowModal}
          showModal={showModal}
          newTodoName={newTodoName}
          handleChangeUpdate={handleChangeUpdate}
          updateTodo={updateTodo}
        />

        {/* berguna untuk menampilkan list yg ada ke browser */}
      </Container>
    </div>
  );
}

export default App;
