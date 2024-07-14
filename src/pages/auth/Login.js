import React, { useState } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../components/customInput/CustomInput';

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
    
    const handleOnChange =(e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value });
        console.log(formData);

    };

    const handleOnSubmit = () => {};


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