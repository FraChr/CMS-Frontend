import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/Views/HomeView.vue";
import CertificateUploadForm from "@/Components/CertificateUploadForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'HomeView',
      path: '/',
      component: HomeView,
    },
    {
      name: 'Upload',
      path: '/certificate/upload',
      component: CertificateUploadForm
    }
  ],
})

export default router
