import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/NewRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtecterRoute=({children})=>{
    const {user}=useContext(AuthContext)
    if(!user){
      return <Navigate to="/login"/>;
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              
              <ProtecterRoute>

            <Home />
              </ProtecterRoute>
            } />
            <Route path="user">
              <Route index element={
                <ProtecterRoute>

              <List columns={userColumns}/>
                </ProtecterRoute>
              } />
              <Route path=":userId" element={
              <ProtecterRoute>

              <Single />
              </ProtecterRoute>
              } />
              <Route
                path="new"
                element={
                  <ProtecterRoute>

                <New inputs={userInputs} title="Add New User" />
                  </ProtecterRoute>
              }
              />
            </Route>
            <Route path="hotel">
              <Route index element={<ProtecterRoute><List columns={hotelColumns} /></ProtecterRoute>} />
              <Route path=":productId" element={
                <ProtecterRoute>

              <Single />
                </ProtecterRoute>
              } />
              <Route
                path="new"
                element={
                  <ProtecterRoute>
                    
                <NewHotel/>
                  </ProtecterRoute>
              }
              />
            </Route>
            <Route path="hotelroom">
              <Route index element={<ProtecterRoute><List columns={roomColumns} /></ProtecterRoute>} />
              <Route path=":productId" element={
                <ProtecterRoute>

                  <Single />
                </ProtecterRoute>
              } />
              <Route
                path="new"
                element={
                  <ProtecterRoute>

                    <NewRoom/>
                  </ProtecterRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
