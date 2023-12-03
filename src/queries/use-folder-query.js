import { useEffect, useState } from "react";
import { getFolderList } from "@/apis/folder-api";

export const useFolderListQuery = (userId) => {
  const [folderList, setFolderList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchFolderList = async () => {
      try {
        const { data: folderList } = await getFolderList(userId);
        if (!ignore) {
          setFolderList(folderList);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!userId) return () => {};
    fetchFolderList();

    return () => {
      ignore = true;
    };
  }, [userId]);

  return { folderList, isLoading, error };
};
