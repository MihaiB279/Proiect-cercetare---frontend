import axios from 'axios';

const PHOTOS_API_BASE_URL = 'http://localhost:8080/api/photos';

class Service {
    async savePhoto(formData) {
        try {
            console.log(formData);
            const response = await axios.post(PHOTOS_API_BASE_URL + '/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data; // Return the response data if needed
        } catch (error) {
            console.error('Error saving photo:', error);
            return null;
        }
    }

    async fetchPhotos() {
        try {
            const response = await axios.get(PHOTOS_API_BASE_URL + '/options');
            return response.data; // Return the array of image byte arrays
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }
}

export default new Service();