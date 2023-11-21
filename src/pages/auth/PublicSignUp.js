import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import CustomInput from "../../components/customInput/CustomInput";
import { auth, db } from "../../config/firebase-config";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { Link } from "react-router-dom";

const inputs = [
    {
        label: "First Name *",
        name: "fName",
        type: "text",
        placeholder: "Sam",
        required: true,
    },
    {
        label: "Last Name *",
        name: "lName",
        type: "text",
        placeholder: "Smith",
        required: true,
    },
    {
        label: "Phone",
        name: "phone",
        type: "number",
        placeholder: "04xxxxx",
    },
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
    },
    {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        placeholder: "*****",
        required: true,
        minLength: 6,
    },
];
function PublicSignUp() {
    const [formData, setFormData] = useState({
        role: "student"
    });
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("Forms is submitted", formData);
        const { password, confirmPassword, ...rest } = formData;
        if (password !== confirmPassword) {
            return toast.error("Password and confirm password did not match!!!");
        }

        // Call firebase to authenticate / save data to auth
        const { email } = formData;
        try {
            const authSnapPromise = createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            toast.promise(authSnapPromise, {
                pending: "In Progress...",
            });
            const authSnap = await authSnapPromise;
            await setDoc(doc(db, "users", authSnap.user.uid), rest);
            toast.success("User created");
        } catch (e) {
            console.log("Error", e);
            toast.error(`Something went wrong ${e.message}`);
        }
    };
    return (
        <div>
            <DefaultLayout>
                <div className="p-3 border shadow rounded admin-form">
                    <Form onSubmit={handleOnSubmit}>
                        {inputs.map((input, i) => {
                            return (
                                <CustomInput key={i} {...input} onChange={handleOnChange} />
                            );
                        })}
                        <Button variant="primary" type="submit">
                            Register as Student
                        </Button>
                    </Form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </DefaultLayout>
        </div>
    );
}

export default PublicSignUp;
