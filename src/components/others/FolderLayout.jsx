import './FolderLayout.css';
import AddLinkBar from '../shared/AddLinkBar';
import SearchBar from '../shared/SearchBar';
import Filtering from '../others/Filtering';
import FolderEditButtons from '../others/FolderEditButtons';
import { Cards } from '../shared/Cards';
import FloatingActionButton from '../shared/FloatingActionButton';
import { useState, useEffect, useContext } from 'react';
import { getFolder, getLinks } from '../fetchApi';
import { SearchContext } from '../../context/SearchContext';

export default function FolderLayout() {
  const { searchValue, setSearchValue, selectedFolder, setSelectedFolder } = useContext(SearchContext);
  const [folder, setFolder] = useState([]);
  const [links, setLinks] = useState([]);
  const [chosenFolderId, setChosenFolderId] = useState(undefined);
  const [chosenFolderName, setChosenFolderName] = useState('');

  function handleQuery(e) {
    const chosenFolderId = e.target.dataset.key;
    const chosenFolderName = e.target.dataset.name;
    setChosenFolderId(chosenFolderId);
    setChosenFolderName(chosenFolderName);
  }

  async function loadFolder() {
    const { data } = await getFolder();
    setFolder(data);
  }

  async function loadLinks() {
    const { data } = await getLinks(chosenFolderId);
    setLinks(data);
  }

  useEffect(() => {
    loadFolder();
  }, []);

  useEffect(() => {
    loadLinks();
  }, [chosenFolderId, chosenFolderName]);

  return (
    <div>
      <AddLinkBar />
      <SearchBar />
      <div> {searchValue}로 검색한 결과입니다. </div>
      <Filtering chosenFolderId={chosenFolderId} folder={folder} handleQuery={handleQuery} />
      <div className="folderDescription">
        <h1 className="folderName">{chosenFolderName}</h1>
        {chosenFolderId && <FolderEditButtons className="folderEditButtons" />}
      </div>
      {links.length ? <Cards links={links} /> : <div className="noLinks">저장된 링크가 없습니다.</div>}
      <FloatingActionButton />
    </div>
  );
}
