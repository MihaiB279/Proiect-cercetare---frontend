import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
export function useCamera() {

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

    return {
        getPhoto,
    };
}
