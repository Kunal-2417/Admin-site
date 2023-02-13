import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import usefetch from"../../hook/usefetch.js"
import axios from "axios";
const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

const {data,loading,error}=usefetch(`/${path}/get`)
const [list, setList] = useState([])
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };
useEffect(() => {
  setList(data)
},[data])

  const handleDelete =async (id) => {
    try{
      // await axios.delete(`http://localhost:8800/api/${path}/delete/${id}`);
      await fetch(`/${path}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    setList(list.filter((item) => item._id !== id));
      }
    catch(err){
      console.log(err)
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/user/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
