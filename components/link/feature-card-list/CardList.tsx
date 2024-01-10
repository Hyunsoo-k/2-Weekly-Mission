import { useGetFolders } from '@/components/folder/data-access-folder';
import { MODALS_ID } from '@/components/link/feature-card-list/constant';
import { AddLinkModal } from '@/components/link/ui-add-link-modal';
import { EditableCard } from '@/components/link/ui-editable-card';
import { NoLink } from '@/components/link/ui-no-link';
import { AlertModal } from '@/components/sharing/ui-alert-modal';
import { useRef, useState, KeyboardEventHandler, useCallback } from 'react';
import { Link } from '@/components/link/type';
import { CardList as UiCardList } from '@/components/link/ui-card-list';

type CardListProps = {
  links: Link[];
};

export const CardList = ({ links }: CardListProps) => {
  const { data: folders } = useGetFolders();
  const cardListRef = useRef(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [selectedLinkUrl, setSelectedLinkUrl] = useState<string>('');

  const closeModal = () => setCurrentModal(null);
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const getPopoverPosition = useCallback(
    (cardIndex: number) => {
      const count =
        cardListRef?.current !== null
          ? window
              .getComputedStyle(cardListRef?.current)
              .getPropertyValue('grid-template-columns')
              .split(' ').length
          : 1;
      if ((cardIndex + 1) % count === 0) {
        return { right: 0 };
      }
      return { left: 0 };
    },
    [cardListRef]
  );

  if (links.length === 0) return <NoLink />;
  return (
    <UiCardList ref={cardListRef}>
      {links.map((link, index) => (
        <EditableCard
          key={link?.id}
          {...link}
          popoverPosition={getPopoverPosition(index)}
          onDeleteClick={() => {
            setSelectedLinkUrl(link?.url ?? '');
            setCurrentModal(MODALS_ID.deleteLink);
          }}
          onAddToFolderClick={() => {
            setSelectedLinkUrl(link?.url ?? '');
            setCurrentModal(MODALS_ID.addToFolder);
          }}
        />
      ))}
      <AlertModal
        isOpen={currentModal === MODALS_ID.deleteLink}
        title='링크 삭제'
        description={selectedLinkUrl}
        buttonText='삭제하기'
        onClick={() => {}}
        onCloseClick={closeModal}
        onKeyDown={handleKeyDown}
      />
      <AddLinkModal
        isOpen={currentModal === MODALS_ID.addToFolder}
        folders={folders}
        description={selectedLinkUrl}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        onAddClick={() => {}}
        onCloseClick={() => {
          setSelectedFolderId(null);
          closeModal();
        }}
        onKeyDown={handleKeyDown}
      />
    </UiCardList>
  );
};
