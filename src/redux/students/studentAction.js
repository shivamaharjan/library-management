import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase-config";
import { setStudentList } from "./studentSlice";

export const getAllStudentAction = () => async (dispatch) => {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("role", "==", "student"));
    const userSnapShot = await getDocs(q);

    const users = [];
    userSnapShot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      users.push({ ...data, id });
    });

    dispatch(setStudentList(users));
  } catch (e) {
    console.log("Error", e);
    toast.error(e.message);
  }
};
