<script setup lang="ts">

  import {ref} from "vue";
  import type {CertificateForm} from "@/Types/CertificateForm.ts";
  import {crudFactory} from "@/Composables/CrudFactory.ts";
  import router from "@/router";
  const certificate = crudFactory.useCertificate();

  const form = ref<CertificateForm>({
    type: '',
    number: null,
    notifiedBody: '',
    issueDate: null,
    expiryDate: null,
    file: null,
  });

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    form.value.file = target.files?.[0] ?? null;
  }

  const submit = async () => {
    const formData = new FormData();

    formData.append("type", form.value.type);
    formData.append("number", String(form.value.number));
    formData.append("notifiedBody", form.value.notifiedBody);
    formData.append("issueDate", String(form.value.issueDate));
    formData.append("expiryDate", String(form.value.expiryDate));

    if(form.value.file){
      formData.append("file", form.value.file);
    }

    await certificate.upload(formData);
    router.push('/')
  }

</script>

<template>
  <h1>TESTING UPLOAD FORM COMPONENT</h1>
  <form class="form" @submit.prevent="submit">
    <label for="type">Type</label>
    <input id="type" v-model="form.type"/>

    <label for="number">Number</label>
    <input id="number" v-model="form.number"/>

    <label for="notifiedBody">Notified Body</label>
    <input id="notifiedBody" v-model="form.notifiedBody"/>

    <label for="issueDate">Issue Date</label>
    <input id="issueDate" type="date" v-model="form.issueDate"/>

    <label for="expiryDate">Expiration Date</label>
    <input id="expiryDate" type="date" v-model="form.expiryDate"/>

    <label for="file">File</label>
    <input id="file" type="file" @change="onFileChange"/>

    <button type="submit">Submit</button>
  </form>

</template>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #ccc;
    margin: 1rem;
    padding: 1rem;
  }
</style>