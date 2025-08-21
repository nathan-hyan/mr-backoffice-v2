import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { Tag } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

import TagList from './components/TagLists/TagList';
import AddTagModal from './components/TagModal/TagModal';

function TagManager() {
  const {
    subscribeToData,
    addDocument,
    updateDocument,
    removeDocument,
    creatingLoading,
  } = useFirestore<Tag>(FirestoreCollections.Tags);

  const [tags, setTags] = useState<Tag[]>([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [tagToEdit, setTagToEdit] = useState<Nullable<Tag>>(null);

  useEffect(() => {
    const unsubscribe = subscribeToData((response) => {
      setTags(response);
    });
    return () => unsubscribe();
  }, [subscribeToData]);

  const openTagModal = (tag?: Tag) => {
    setTagToEdit(tag || null);
    setShowTagModal(true);
  };

  const closeTagModal = () => {
    setShowTagModal(false);
    setTagToEdit(null);
  };

  const handleSubmitTag = async (newData: Tag) => {
    if (tagToEdit) {
      updateDocument(tagToEdit.id!, {
        id: tagToEdit.id!,
        ...tagToEdit,
        ...newData,
      });
    } else {
      const docRef = (await addDocument({
        tag: newData.tag,
      })) as import('firebase/firestore').DocumentReference;
      await updateDocument(docRef.id, { id: docRef.id, tag: newData.tag });
    }
    closeTagModal();
  };

  return (
    <>
      <AddTagModal
        show={showTagModal}
        handleClose={closeTagModal}
        submitTag={handleSubmitTag}
        isLoading={creatingLoading}
        initialData={tagToEdit || undefined}
      />
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TagList
              data={tags}
              removeDocument={removeDocument}
              openModal={openTagModal}
              selectedTagId={tagToEdit ? tagToEdit.id ?? null : null}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default TagManager;
