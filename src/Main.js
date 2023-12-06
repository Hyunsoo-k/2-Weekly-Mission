import App from "./components/App";
import Folder from "./components/Folder";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getFolders, UserApi as userApi } from "./api";
import { useEffect, useState } from "react";

function Main() {
  const [userStatus, setUserStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState([]);
  // const [userProfile, setUserProfile] = useState({
  //   img: "",
  //   email: "",
  // });
  const [userFolder, setUserFolder] = useState({
    name: "",
    userName: "",
    img: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderResult = await getFolders();
        const userResult = await userApi();

        setUserFolder((prev) => ({
          ...prev,
          name: folderResult.folder.name,
          userName: folderResult.folder.owner.name,
          img: folderResult.folder.owner.profileImageSource,
        }));
        setCardData([...folderResult.folder.links]);
        setUserStatus(true);

        setUserData(userResult.data[0]);
        // setUserProfile((prev) => ({
        //   ...prev,
        //   img: userResult.data[0].image_source,
        //   email: userResult.data[0].email,
        // }));
      } catch (error) {
        console.log(error);
        setUserStatus(false);
      }
    };
    fetchData();
  }, []);
  return (
    <BrowserRouter>
      <Header userData={userData} />
      <Routes>
        <Route
          path="/shared"
          element={
            <App
              userFolder={userFolder}
              userStatus={userStatus}
              cardData={cardData}
            />
          }
        />
        <Route path="/folder" element={<Folder />} />

        <Route path="*" element={<Navigate to="/shared" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Main;
