import { listAll, ref, uploadBytes } from 'firebase/storage';

import { storage } from '~config/firebase';

function useStorage() {
    const uploadImage = (imageUpload: Blob, path: string) => {
        const imageRef = ref(
            storage,
            `${path}/${imageUpload.size + crypto.randomUUID()}`
        );
        return uploadBytes(imageRef, imageUpload);
    };

    const getImages = (path: string) => {
        const imageListRef = ref(storage, `${path}/`);
        return listAll(imageListRef);
    };
    return { uploadImage, getImages };
}

export default useStorage;
