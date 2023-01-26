import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Sabbashop Time Log Calculator</h1>
        </div>
      </div>

      <div className="row my-5">
        <div className="col d-flex flex-row-reverse">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-log")}
          >
            Add Employee Time Sheet
          </button>
        </div>
      </div>

      <div className="row my-5">
        <div className="col">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Total Hours</th>
                <th scope="col">Total Breaks</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mohit</td>
                <td>101</td>
                <td>20</td>
                <td>
                  <div className="d-flex">
                    <FaEdit />
                    <FaTrash className="ms-2 text-danger" />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Roch</td>
                <td>101</td>
                <td>15</td>
                <td>
                  <div className="d-flex">
                    <FaEdit />
                    <FaTrash className="ms-2 text-danger" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
