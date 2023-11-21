import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/layouts/AdminLayout";
import { getAllStudentAction } from "../../redux/students/studentAction";

function Clients() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudentAction());
  }, []);

  const studentList = useSelector((state) => state.students.studentList);
  return (
    <AdminLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{student.fName} {student.lName}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
              </tr>
            );
          })}
          ;
        </tbody>
      </Table>
    </AdminLayout>
  );
}

export default Clients;
