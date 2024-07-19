import React, { useState } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../components/customInput/CustomInput';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

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
    },];

function Login() {

    const [formData, setFormData] =useState({});
    const navigate = useNavigate();
    
    const handleOnChange =(e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
        console.log(formData);

    };

    const handleOnSubmit = async (e) => {
      e.preventDefault();
      try{const { email, password } = formData;
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "In Progress...",
      });
      const { user } = await signInPromise;
      toast.success("Login in Successful");

      }
      catch{
        toast.error(`Something went wrong ${e.message}`);

      }
      navigate("/dashboard");
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
        </div>
      </div>
    </DefaultLayout>
  </>
  )
}

export default Login