import Header from "../header/Header.js";
import Footer from "../footer/Footer.js";
import Main from "../main/Main.js";
import { useEffect, useState } from "react";
import { getData } from "../api/api";

function SharedPage() {
  const [profileDatas, setProfileDatas] = useState({
    id: 0,
    name: "",
    email: "",
    profileImageSource: "",
  });

  const [folderDatas, setFolderDatas] = useState({});
  const [ownerDatas, setOwnerDatas] = useState({});
  const [links, setLinks] = useState([]);

  const getSampleUserData = async () => {
    try {
      const response = await getData("sample/user");
      // console.log(response, "Header");
      const { id, name, email, profileImageSource } = response;
      setProfileDatas((prevProfileDatas) => ({
        ...prevProfileDatas,
        id: id,
        name: name,
        email: email,
        profileImageSource: profileImageSource,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const getLinks = async () => {
    try {
      const result = await getData("sample/folder");
      // console.log("Main", result);
      const linksData = result.folder.links;
      const foldersData = result.folder;
      const ownerData = result.folder.owner;

      setFolderDatas(foldersData);
      setLinks(linksData);
      setOwnerDatas(ownerData);
    } catch (e) {
      console.log(`getLinks에서 ${e} 오류`);
    }
  };

  useEffect(() => {
    getSampleUserData();
    getLinks();
  }, []);
  return (
    <>
      <Header profileDatas={profileDatas} />
      <Main ownerDatas={ownerDatas} folderDatas={folderDatas} links={links} />
      <Footer />
    </>
  );
}

export default SharedPage;
