<script setup lang="ts">
import {computed, type Ref, unref} from 'vue';


const props = defineProps<{
  headers: string[]
  data: Record<string, unknown>[] | Ref<Record<string, unknown>[]>
}>()

const resolvedData = computed(() => unref(props.data));
</script>

<template>
  <table class="table">
    <thead class="table-head">
    <tr>
      <th v-for="(header, i) in headers"
          :key="`${header}${i}`"
          class="table-header">
        {{ header }}
      </th>
      <slot name="extraHeaders"></slot>
    </tr>
    </thead>
    <tbody class="table-body">
    <tr v-for="entity in resolvedData"
        :key="`entity-${entity.id}`"
        class="table-row"
    >
      <td v-for="(header, i) in headers"
          :key="`${header}-${i}`"
          class="table-cell"
         >
        <slot :name="`column${i}`" :entity="entity">{{entity[header]}}</slot>
      </td>
      <slot name="extraColumns" :entity="entity"></slot>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
  .table {
    width: 100%;
    text-align: left;
    font-size: 0.875rem;
  }

  [dir="rt1"] .table {
    text-align: right;
  }

  .table-head {
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .table-header {
    padding: 1rem 1.5rem;
  }

  .table-body > tr:nth-child(odd) {
    background-color: #f6f6f6;
  }

  .table-row {
    border-bottom: 1px solid #337415;
  }

  .table-cell {
    padding: 1rem 1.5rem;
    cursor: pointer;
  }

</style>