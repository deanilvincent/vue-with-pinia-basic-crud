<template>
  <h2 class="text-4xl font-extrabold dark:text-white">
    Manage Employees ({{ paginatedEmployees.totalData }})
  </h2>
  <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
  <div class="mt-10">
    <CreateEditEmployee />
    <ListOfEmployees />
  </div>
</template>

<script setup>
import { useEmployeeStore } from "../stores/employeeStore";
import { CreateEditEmployee, ListOfEmployees } from "../components/Employee";
import { storeToRefs } from "pinia";

const employeeStore = useEmployeeStore();
const { paginatedEmployees } = storeToRefs(employeeStore);
</script>
