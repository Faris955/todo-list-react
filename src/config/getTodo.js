import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Pastikan path import sesuai

export async function getTodos() {
  // Ubah nama fungsi menjadi getTodos (plural) karena mengambil banyak todo
  try {
    const todoCol = collection(db, "to-do");
    const todoSnapshot = await getDocs(todoCol);
    const todoList = todoSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(todoSnapshot.docs);
    return todoList;
  } catch (error) {
    console.error("Error getting documents: ", error);
    // Tambahkan logika untuk menangani error di sini, misalnya:
    // - Menampilkan pesan error kepada pengguna menggunakan toast
    // - Melakukan retry atau tindakan lain yang sesuai
    throw error;
  }
}
