import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isStudent } from "../../utils";

function SideBar() {
  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className="bg-dark text-light sidebar">
      <div className="text-center mt-4">{isStudent(userInfo) ? "Student" : "Admin"}</div>
      <hr />
      <div>
        <ul className="list-unstyled ms-5 me-5">
          {isStudent(userInfo) ? <li>
            <Link className="nav-link" to="/history">
              History
            </Link>
          </li> :
            <>
              <li>
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/clients">
                  Clients
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/history">
                  History
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/admin-signup">
                  Admin SignUp
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
