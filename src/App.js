import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SharedPage from "./page/shared/SharedPage";
import FolderPage from "./page/folder/FolderPage";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate  replace to="/folder" />} />
        <Route path="/shared" element={<SharedPage />}></Route>
        <Route path="/folder" element={<FolderPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;