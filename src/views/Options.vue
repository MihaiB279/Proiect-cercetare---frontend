<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Choose a Photo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-radio-group v-model="selectedPhoto">
          <ion-item v-for="(image, index) in images" :key="index">
            <ion-label class="photo-label">Leaf {{ index + 1 }}</ion-label>
            <ion-radio :value="index"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
      <ion-button @click="handleSelection">Select</ion-button>
      <ion-img v-if="selectedPhoto !== null" :src="imageUrls[selectedPhoto]"></ion-img>
    </ion-content>
  </ion-page>
</template>

<script>
import Service from '@/services/Service';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
  IonToast
} from '@ionic/vue';
import {useRouter} from "vue-router";

export default {
  name: 'Photos',
  data() {
    return {
      router: useRouter(),
      images: [],
      imageUrls: [],
      selectedPhoto: null,
    };
  },
  async created() {
    try {
      this.images = await Service.fetchPhotos();

      this.imageUrls = this.images.map((base64String, index) => {
        return `data:image/jpeg;base64, ${base64String}`;
      });

    } catch (error) {
      console.error('Error fetching images:', error);
    }
  },
  methods: {
    async handleSelection() {
      if (this.selectedPhoto !== null) {
        if (this.selectedPhoto.toString() === "1") {
          alert("Your answer is correct!");
        } else {
          alert("Your answer is wrong!");
        }
        await this.router.push("/home");
      }
    },
  },
  components: {
    IonToast,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonButton,
    IonList,
    IonRadioGroup,
    IonLabel,
    IonRadio,
    IonItem
  }
};
</script>

<style scoped>
.photo-label {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
}
</style>