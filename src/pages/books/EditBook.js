import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CustomInput from "../../components/customInput/CustomInput";
import AdminLayout from "../../components/layouts/AdminLayout";
import { getBookAction, updateBookAction } from "../../redux/book/bookAction";

function EditBook() {
  const { id } = useParams();
  const { selectedBook } = useSelector((state) => state.book);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getBookAction(id));
  }, [id]);

  useEffect(() => {
    setFormData(selectedBook);
  }, [selectedBook]);

  const dispatch = useDispatch();
  const inputs = [
    {
      label: "Book Title",
      name: "title",
      type: "text",
      value: formData.title,
      placeholder: "Twilight",
      required: true,
    },
    {
      label: "Author Name",
      name: "author",
      type: "text",
      value: formData.author,
      placeholder: "Author",
      required: true,
    },
    {
      label: "Published Year",
      name: "year",
      type: "number",
      value: formData.year,
      placeholder: "2022",
    },
    {
      label: "Image URL",
      name: "url",
      type: "url",
      value: formData.url,
      placeholder: "https://...",
    },
    {
      label: "Summary",
      name: "summary",
      type: "text",
      as: "textarea",
      rows: "4",
      value: formData.summary,
      placeholder: "https://...",
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("New Form Data", formData);
    // Update on DB
    dispatch(updateBookAction(formData));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <AdminLayout>
      <h3>Edit Book</h3>
      <hr />
      <Link to="/books">
        <Button>Go Back</Button>
      </Link>
      <div className="p-3 border shadow rounded admin-form">
        <Form onSubmit={handleOnSubmit}>
          {inputs.map((input, i) => {
            return <CustomInput key={i} {...input} onChange={handleOnChange} />;
          })}

          <Button variant="primary" type="submit">
            Edit Book
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default EditBook;
