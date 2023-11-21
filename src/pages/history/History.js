import React, { useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBorrowAction, updateBorrowHistoryAction } from "../../redux/borrowHistory/borrowHistoryAction";
import { Button, Table } from "react-bootstrap";
import { updateBookAction } from "../../redux/book/bookAction";

function History() {
  const dispatch = useDispatch()
  const borrowHistory = useSelector(state => state.borrowHistory.borrowHistoryList)
  const { userInfo } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(getAllBorrowAction(userInfo.uid))
  }, [])
  const returnBook = (history) => {
    const borrowObj = {
      id: history.id,
      isReturn: true,
      availableFrom: Date.now()
    }
    dispatch(updateBorrowHistoryAction(borrowObj, userInfo.uid))
    // We also have to update Book info to mark it available
    const bookObj = {
      id: history.bookId,
      isAvailable: true,
      availableFrom: Date.now()
    }
    dispatch(updateBookAction(bookObj))
  }
  return (
    <AdminLayout>
      <div>
        <Table striped bordered hover>

          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>BorrowAt</th>
              <th>ReturnedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowHistory.map((history, i) => {
              return (<tr>
                <td>{i + 1}</td>
                <td>
                  <img src={history.url} alt="Book" width={"100px"} />
                </td>
                <td>
                  {history.userName} -

                  {new Date(history.borrowAt).toDateString()}
                </td>
                <td>{history.isReturn ? (new Date(history.availableFrom).toDateString()) : `Not returned yet - Deadline - ${new Date(history.availableFrom).toDateString()}`}</td>
                <td>{history.isReturn ? ("Returned") : <Button onClick={() => returnBook(history)} variant="warning">Return</Button>}</td>
              </tr>)
            })}


          </tbody>
        </Table>
      </div>

    </AdminLayout>);
}

export default History;
