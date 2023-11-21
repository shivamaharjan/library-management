import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BookTable from "../../components/book/BookTable";
import AdminLayout from "../../components/layouts/AdminLayout";

function Books() {
  return (
    <AdminLayout>
      <h3>Books</h3>
      <hr />
      <div>
        <Link to="/add-book">
          <Button>Add Book</Button>
        </Link>
      </div>
      <BookTable />
    </AdminLayout>
  );
}

export default Books;
