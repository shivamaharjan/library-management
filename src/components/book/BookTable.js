import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBookAction,
  getAllBookAction,
} from "../../redux/book/bookAction";

function BookTable() {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getAllBookAction());
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img src={book.url} alt="" width={"120px"} />
                </td>
                <td>
                  {book.title} - {book.year}
                </td>
                <td>
                  <Link to={`/edit-book/${book.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteBookAction(book.id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default BookTable;
