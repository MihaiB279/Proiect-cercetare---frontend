<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="title-container">
        <h1>Add your leaf picture</h1>
      </div>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="capturePhoto">
          <ion-icon :icon="camera()"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonFabButton} from '@ionic/vue';
import {useCamera} from '@/services/useCamera';
import {useFilesystem} from '@/services/useFilesystem';
import {camera} from 'ionicons/icons';
import {useRouter} from "vue-router";
import Service from "@/services/Service.js";

export default {
  setup() {

    const router = useRouter();
    const {getPhoto, getStoredPhotos, savePhotoToPreferences} = useCamera();
    const {readFile, writeFile, deleteFile} = useFilesystem();

    const capturePhoto = async () => {
      const { base64String } = await getPhoto();
      const blob = base64toBlob(base64String); // Convert base64 string to Blob
      const formData = new FormData();
      const file = new File([blob], 'photo.jpeg', { type: 'image/jpeg' });
      formData.append('photo', file);
      try {
        const savedPhoto = await Service.savePhoto(formData); // Send as FormData

        // Handle the response from the backend if needed
        if (savedPhoto) {
          // Handle success
          console.log('Photo successfully saved on the backend:', savedPhoto);
          await router.push("/options");
        } else {
          // Handle failure
          console.error('Failed to save photo on the backend');
        }
      } catch (error) {
        // Handle errors
        console.error('Error saving photo:', error);
      }
    };

// Function to convert base64 string to Blob
    function base64toBlob(base64String) {
      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: 'image/jpeg' });
    }
    return {
      capturePhoto,
    };
  },
  methods: {
    camera() {
      return camera
    },
  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonFabButton
  }
}
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.title-container h1 {
  font-size: 2.3em;
  text-align: center;
}
</style>
