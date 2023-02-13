import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatc} = useContext(DarkModeContext);
const userInfo = JSON.parse(localStorage.getItem('user'));
  console.log(userInfo)
  const imgurl=userInfo.img;
  const loginperson=userInfo.username;
  console.log(loginperson)
  //x.img?
  //image of user stored in localstorage?

  return (
    <div className="nnavbar">
      <div className="wwrapper">
        <div className="ssearch">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="iitems">
          {/* <div className="iitem">
            <LanguageOutlinedIcon className="iicon" />
            English
          </div> */}
          <div className="iitem">
            <DarkModeOutlinedIcon
              className="iicon"
              onClick={() => dispatc({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="iitem">
            <FullscreenExitOutlinedIcon className="iicon" />
          </div> */}
          {/* <div className="iitem">
            <NotificationsNoneOutlinedIcon className="iicon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="iitem">
            <ChatBubbleOutlineOutlinedIcon className="iicon" />
            <div className="ccounter">2</div>
          </div> */}
          <div className="iitem">
            {userInfo.username}
            {/* <ListOutlinedIcon className="iicon" /> */}
          </div>
          <div className="iitem">
            <img
              src={imgurl}
              alt=""
              className="aavatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
