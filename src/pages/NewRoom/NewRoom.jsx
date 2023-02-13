import "./NewRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { HotelRoomInputs } from "../../formSource";
import useFetch from "../../hook/usefetch";

const NewRoom = () => {

      const { data, loading, error } = useFetch(`/hotel/get`);

      const [hotelid,setHotelid]=useState(undefined)
      const [roomno,setRoomno]=useState([])


  const [file, setFile] = useState("");

  const [roominfo,setRoominfo]=useState({})

  const handleChange=(e)=>{
      setRoominfo(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  console.log(hotelid)
  const handleClick=async (e)=>{
    e.preventDefault();
    const roomNumbers=roomno.split(",").map(room=>({number:room}))
    console.log(roomNumbers)
    try{
      await axios.post(`http://localhost:8800/api/hotelroom/create/${hotelid}`,{...roominfo,roomNumbers});
      <script>
              function myFunction() {
                  alert("New Room created")
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
          <h1>Add New HotelRoom</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>

              {HotelRoomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.field}/>
                </div>
              ))}
              <div className="formInput">
                  <label>Choose a hotel</label>
                <select name="" id="hotelId" onChange={e=>setHotelid(e.target.value)}>
                  {loading?"Loading...":data.map((hotel)=>(
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
                </div>
                <div className="formInput">
                  <label>Rooms</label>
                    <textarea onChange={e=>setRoomno(e.target.value)} placeholder="give comma',' b/w room no"></textarea>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
