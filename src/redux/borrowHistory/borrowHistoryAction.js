import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";

import { setBorrowHistories } from "./borrowHistorySlice";
import { updateBookAction } from "../book/bookAction";


// BOOK CRUD operations

export const addNewBorrowAction = (borrowObj) => async (dispatch) => {
    try {
        // save this book to firebase/API call...
        const collectionRef = collection(db, "borrow_history");
        const docRefPromise = addDoc(collectionRef, borrowObj);
        toast.promise(docRefPromise, {
            pending: "In Progress...",
        });
        await docRefPromise;
        toast.success("Successful");
        // Update the book info as well
        dispatch(updateBookAction({
            id: borrowObj.bookId,
            isAvailable: false,
            availableFrom: borrowObj.availableFrom
        }))
    } catch (e) {
        console.log("error", e);
        toast.error(e.message);
    }
};

export const getAllBorrowAction = (uid) => async (dispatch) => {
    // Grab all borrow history from firebase
    // Set the borrowList in our store
    try {
        // Make some update so user can only fetch history
        // that belongs to them.
        const borrowRef = collection(db, "borrow_history");
        const q = query(borrowRef, where("userId", "==", uid))
        const borrowSnapshot = await getDocs(q);
        const borrowHistory = [];
        borrowSnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            borrowHistory.push({ ...data, id });
        });
        // Set book info to our redux store
        dispatch(setBorrowHistories(borrowHistory));
    } catch (e) {
        console.log("Error", e);
        toast.error(e.message);
    }
};


export const updateBorrowHistoryAction = (borrowObj, uid) => async (dispatch) => {
    try {
        const { id, ...rest } = borrowObj;
        const borrowRef = doc(db, "borrow_history", id);
        const docRefPromise = setDoc(borrowRef, rest, { merge: true });
        toast.promise(docRefPromise, {
            pending: "In Progress...",
        });
        await docRefPromise;
        toast.success("Updated");
        // Get fresh data from DB
        dispatch(getAllBorrowAction(uid));
    } catch (e) {
        console.log("Error", e);
        toast.error(e.message);
    }
};