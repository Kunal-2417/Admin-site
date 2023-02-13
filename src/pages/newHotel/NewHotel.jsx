import "./NewHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { HotelInputs } from "../../formSource";
// import { useFetcher } from "react-router-dom";
import useFetch from "../../hook/usefetch";
// import { Alert } from 'react-alert'


const NewHotel = () => {
    const { data, loading} = useFetch(`/hotelroom/get`);

  const [files, setFiles] = useState("");

  const [info,setInfo]=useState({})
  const [roominfo,setRoominfo]=useState([])

  const handleSelect=async (e)=>{
    const roomvalue=Array.from(e.target.selectedOptions,(option)=>option.value)
   setRoominfo(roomvalue)
   // setUserinfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  console.log(roominfo) 
  const handleChange=(e)=>{
      setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick=async (e)=>{
    e.preventDefault();
    
    try{
      const list =await Promise.all(Object.values(files).map(async (file)=>{
        const data=new FormData()
        data.append("file",file)
        data.append("upload_preset","upload")
        const uploadRes=await axios.post("https://api.cloudinary.com/v1_1/kunaldev/image/upload",data)
        // return uploadRes.data.url
        const {url}=uploadRes.data;
        return url;   
    }
    ))
    const newHotel={...info,rooms:roominfo,photos:list};
    await axios.post("/hotel/create",newHotel);
      <script>
              function myFunction() {
                  alert("New Hotel created")
              }
              </script>
  }

    catch(err){
      console.log(err.response.data)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {HotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.field}/>
                </div>
              ))}
              <div className="formInput" >
                  <label>Featured</label>
                  <select name="" id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="selectRooms" >
                  <label>Room</label>
                  <select
                   id="rooms"
                   multiple
                    onChange={handleSelect}>
                    {loading?"Loading Please Wait":data.map((room)=>(
                      <option  key={room._id} value={room._id}>{room.title}</option>
                    ))}
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
