<script setup lang="ts">
  import {crudFactory} from "@/Composables/CrudFactory.ts";
  import {computed, onMounted, ref} from "vue";
  import Table from "@/Table.vue";

  const certificate = crudFactory.useCertificate();

  const headers = computed(() => {
    const first = certificate.items.value[0];

    if (!first) return [];

    return Object.keys(first).filter(key => key !== "id");
  });

  const downloadCertificate = async (id: number) => {
    await certificate.downloadFile(id);
  }

  onMounted(async () => {
    await certificate.getAll()
  });
</script>

<template>
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