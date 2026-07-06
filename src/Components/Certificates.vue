<script setup lang="ts">
  import {crudFactory} from "@/Composables/CrudFactory.ts";
  import {computed, onMounted, ref} from "vue";
  import Table from "@/Table.vue";
  import router from "@/router";
  import { useDateTimeUtils } from "@/Composables/Utils/useDateTimeUtils.ts";
  import SearchBar from "@/Components/SearchBar.vue";

  const { convertUtcToDate, convertUtcToDateTime } = useDateTimeUtils();

  const certificate = crudFactory.useCertificate();

  const searchTerm = ref<string>("");
  const filterType = ref<string>("");

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

  const handleSearch = async (value: string) => {
    searchTerm.value = value;
    await applyFilter();
  }

  const applyFilter = async () => {
    const params: Record<string, any> = {};

    if(searchTerm.value) {
      params.number = searchTerm.value;
    }
    if(filterType.value) {
      params.type = filterType.value;
    }
    await certificate.getAll(params);
  }

  onMounted(async () => {
    await certificate.getAll();
    await certificate.getTypes();
  });
</script>

<template>
  <button @click="toUploadCertificate">Upload Certificate</button>
  <SearchBar v-model="searchTerm" @search="handleSearch"/>

  <select v-model="filterType" @change="applyFilter">
    <option value=""></option>
    <option v-for="type in certificate.types.value" :key="type" :value="type">{{type}}</option>
  </select>

  <Table :data="certificate.items" :headers="headers">

    <template #extraHeaders>
      <th></th>
    </template>

    <template #column3="{entity}">
      {{convertUtcToDate(entity.issueDate as string)}}
    </template>

    <template #column4="{entity}">
      {{convertUtcToDate(entity.expiryDate as string)}}
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