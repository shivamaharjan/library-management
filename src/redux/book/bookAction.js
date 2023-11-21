import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { setBooks, setSelectedBook } from "./bookSlice";

// BOOK CRUD operations

export const addNewBookAction = (bookObj) => async (dispatch) => {
  try {
    // save this book to firebase/API call...
    const collectionRef = collection(db, "books");
    const docRefPromise = addDoc(collectionRef, bookObj);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("New Book added successfully");
  } catch (e) {
    console.log("error", e);
    toast.error(e.message);
  }
};

export const getAllBookAction = () => async (dispatch) => {
  // Grab all books from firebase
  // Set the books to booklist in our store
  try {
    const bookRef = collection(db, "books");
    const bookSnapSnot = await getDocs(bookRef);
    const books = [];
    bookSnapSnot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      books.push({ ...data, id });
    });
    // Set book info to our redux store
    dispatch(setBooks(books));
  } catch (e) {
    console.log("Error", e);
    toast.error(e.message);
  }
};

export const getBookAction = (id) => async (dispatch) => {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const bookData = docSnap.data();
      dispatch(setSelectedBook({ ...bookData, id }));
    } else {
      toast.error("No book found");
    }
  } catch (e) {
    console.log("Error", e);
    toast.error(e.message);
  }
};

export const deleteBookAction = (id) => async (dispatch) => {
  try {
    const bookRef = doc(db, "books", id);
    const docRefPromise = deleteDoc(bookRef);
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("Deleted");
    // Get fresh data from DB
    dispatch(getAllBookAction());
  } catch (e) {
    console.log("Error", e);
    toast.error(e.message);
  }
};

export const updateBookAction = (bookObj) => async (dispatch) => {
  try {
    const { id, ...rest } = bookObj;
    const bookRef = doc(db, "books", id);
    const docRefPromise = setDoc(bookRef, rest, { merge: true });
    toast.promise(docRefPromise, {
      pending: "In Progress...",
    });
    await docRefPromise;
    toast.success("Updated");
    // Get fresh data from DB
    dispatch(getAllBookAction());
  } catch (e) {
    console.log("Error", e);
    toast.error(e.message);
  }
};
