<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-fab>
        <ion-fab-button @click="capturePhoto">
          <ion-icon :icon="camera()"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonFabButton} from '@ionic/vue';
import {useCamera} from '@/services/useCamera';
import {camera} from 'ionicons/icons';

export default {
  setup(){

    const {getPhoto, getStoredPhotos, savePhotoToPreferences} = useCamera();
    const {readFile, writeFile, deleteFile} = useFilesystem();
    const capturePhoto = async () => {
      const {base64String} = await getPhoto();
      const filepath = new Date().getTime() + '.jpeg';
      await writeFile(filepath, base64String);
      const webviewPath = `data:image/jpeg;base64,${base64String}`;
      const newPhoto = {filepath, webviewPath};
      storedPhotos.value.push(newPhoto);
      await savePhotoToPreferences(newPhoto);

    return {
      capturePhoto,
    }
    };
  },
  methods: {
    camera() {
      return camera
    },
  },
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
</style>
