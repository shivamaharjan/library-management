import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { setUserInfo } from "./authSlice";

export const getUserInfoAction = (uid) => async (dispatch) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      dispatch(setUserInfo({ ...userData, uid: uid }));
    } else {
      console.log("No Data found");
    }
  } catch (e) {
    console.log("Error", e);
  }
};
