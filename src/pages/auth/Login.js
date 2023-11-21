import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../components/customInput/CustomInput";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { auth } from "../../config/firebase-config";
import { getUserInfoAction } from "../../redux/auth/authAction";
import { isStudent } from "../../utils";
const inputs = [
  {
    label: "Email *",
    name: "email",
    type: "email",
    placeholder: "sam@sam.com",
    required: true,
  },
  {
    label: "Password *",
    name: "password",
    type: "password",
    placeholder: "*****",
    required: true,
    minLength: 6,
  },
];
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    // Is user is logged in
    if (userInfo?.uid) {
      // navigate to dashboard
      if (isStudent(userInfo)) {
        navigate("/history");
      } else {
        navigate("/dashboard")
      }

    }
    // if(userInfo.)
  }, [userInfo]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "In Progress...",
      });
      const { user } = await signInPromise;
      const userId = user.uid;
      toast.success("Login in Successful");
      // pull the user info from DB
      dispatch(getUserInfoAction(userId));
      // Set it to Store
    } catch (e) {
      toast.error(`Something went wrong ${e.message}`);
    }
  };
  return (
    <>
      <DefaultLayout>
        <div>
          <div className="p-3 border shadow rounded admin-form">
            <Form onSubmit={handleOnSubmit}>
              {inputs.map((input, i) => {
                return (
                  <CustomInput key={i} {...input} onChange={handleOnChange} />
                );
              })}

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p>Forget Password? <Link to="/reset-password"> Reset </Link></p>
            <p>Don't have account? <Link to="/sign-up"> Sign Up </Link></p>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default Login;
