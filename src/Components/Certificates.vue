<script setup lang="ts">
  import {crudFactory} from "@/Composables/CrudFactory.ts";
  import {computed, onMounted} from "vue";
  import Table from "@/Table.vue";
  import router from "@/router";

  const certificate = crudFactory.useCertificate();

  const headers = computed(() => {
    const first = certificate.items.value[0];

    if (!first) return [];

    return Object.keys(first).filter(key => key !== "id");
  });

  const downloadCertificate = async (id: number) => {
    await certificate.downloadFile(id);
  }

  const toUploadCertificate = () => {
    router.push("/certificate/upload");
  }

  onMounted(async () => {
    await certificate.getAll()
  });
</script>

<template>
  <button @click="toUploadCertificate">Upload Certificate</button>
  <Table :data="certificate.items" :headers="headers">
    <template #extraHeaders>
      <th></th>
    </template>
    <template #extraColumns="{ entity }">
      <td>
        <button @click="downloadCertificate(entity.id as number)">Download</button>
      </td>
    </template>
  </Table>
</template>

<style scoped>

</style>