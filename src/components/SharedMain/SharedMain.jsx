import './SharedMain.css';
import FolderInfo from '../FolderInfo/FolderInfo';
import SearchBar from '../atoms/SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import { getSampleFolderData } from '../../utils/api';
import { useEffect, useState } from 'react';

export default function SharedMain() {
  const [folderData, setFolderData] = useState();
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const handleLoadFolderData = async () => {
    let result;
    try {
      result = await getSampleFolderData();
      setLoadingError(null);
    } catch (error) {
      setLoadingError(error);
      console.log(error);
      return;
    }

    const { folder } = result;
    setFolderData(folder);
    setIsLoadingSuccess(true);
    console.log('샘플 폴더 데이터를 가져왔습니다.');
  };

  useEffect(() => {
    handleLoadFolderData();
  }, []);

  return isLoadingSuccess ? (
    <main>
      <FolderInfo owner={folderData.owner} folderName={folderData.name} />
      <article className="test">
        <SearchBar />
        <CardList links={folderData.links} />
      </article>
    </main>
  ) : null;
}
