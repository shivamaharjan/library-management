import React, { useState } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout'
import { Link } from 'react-router-dom';
import CustomInput from '../../components/customInput/CustomInput';
import { Button, Form } from 'react-bootstrap';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [formData, setFormData] = useState({});
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { email } = formData;
        sendPasswordResetEmail(auth, email).then(() => {
            toast.success("Reset Successful")
        }).catch(e => {
            toast.error(e.message)
        })
    }
    const inputs = [
        {
            label: "Email *",
            name: "email",
            type: "text",
            placeholder: "xxx@xxx.com",
            required: true,
        }]
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
                            Reset
                        </Button>
                    </Form>
                </div>
            </DefaultLayout>
        </div>
    )
}

export default ResetPassword