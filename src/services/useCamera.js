import {ref} from 'vue';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Preferences} from '@capacitor/preferences';
import { useFilesystem } from '@/services/useFilesystem';
const { readFile, writeFile, deleteFile } = useFilesystem();
export function useCamera() {
    const photoData = ref(null);

    const getPhoto = async () => {
        try {
            return await Camera.getPhoto({
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
                quality: 100,
            });
        } catch (error) {
            console.error('Camera error:', error);
            return null;
        }
    };

    const savePhotoToPreferences = async (base64Image) => {
        try {
            let storedPhotos = (await Preferences.get({ key: 'storedPhotos' })).value || '[]';
            storedPhotos = JSON.parse(storedPhotos);
            storedPhotos.push(base64Image);
            await Preferences.set({ key: 'storedPhotos', value: JSON.stringify(storedPhotos) });
        } catch (error) {
            console.error('Error saving photo to preferences:', error);
        }
    };

    const getStoredPhotos = async () => {
        try {
            const storedPhotos = (await Preferences.get({ key: 'storedPhotos' })).value || '[]';
            const photos = JSON.parse(storedPhotos);
            for (let photo of photos) {
                const data = await readFile(photo.filepath);
                photo.webviewPath = `data:image/jpeg;base64,${data}`;
            }
            return photos;
        } catch (error) {
            console.error('Error retrieving stored photos from preferences:', error);
            return [];
        }
    };

    return {
        getPhoto,
        getStoredPhotos,
        savePhotoToPreferences
    };
}
