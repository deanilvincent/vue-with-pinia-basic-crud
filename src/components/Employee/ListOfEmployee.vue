<template>
  <TablePagination
    :data="paginatedEmployees"
    :page="page"
    :per-page="perPage"
    :pagination-route="'home'"
    :is-loading="isLoadingData"
    @onHandleSearch="handleSearch"
  >
    <template #header>
      <th scope="col" class="py-3 px-6">ID</th>
      <th scope="col" class="py-3 px-6">NAME</th>
      <th scope="col" class="py-3 px-6">BIRTHDAY</th>
      <th scope="col" class="py-3 px-6">IS ACTIVE?</th>
      <th scope="col" class="py-3 px-6"></th>
    </template>
    <template #list>
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        v-for="employee in paginatedEmployees.data"
        :key="employee.id"
      >
        <td class="py-4 px-6">{{ employee.employeeId }}</td>
        <td class="py-4 px-6">{{ employee.name }}</td>
        <td class="py-4 px-6">
          {{ $filters.readableDate(employee.birthday) }}
        </td>
        <td class="py-4 px-6">{{ employee.isActive ? "YES" : "NO" }}</td>
        <td class="py-4 px-6">
          <Button
            type="button"
            @handle-click="selectData(employee)"
            text="EDIT"
            class-type="info"
            :is-loading="isLoadingButton"
          />
          <Button
            type="button"
            @handle-click="deleteData(employee.employeeId)"
            class-type="danger"
            text="DELETE"
            :is-loading="isLoadingButton"
          />
        </td>
      </tr>
    </template>
  </TablePagination>
</template>

<script setup>
import { useEmployeeStore } from "../../stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { deleteEmployee } from "../../apis";
import TablePagination from "../TablePagination.vue";
import { useRoute } from "vue-router";
import Button from "../Button.vue";

const employeeStore = useEmployeeStore();
const { getPaginatedEmployees } = useEmployeeStore();
const { paginatedEmployees, employee, isLoadingData, isSaving } =
  storeToRefs(employeeStore);

const isLoadingButton = ref(isSaving);
const route = useRoute();

const page = ref(1);
const perPage = ref(5);

const selectData = (data) => {
  employee.value = data;
};

const deleteData = async (id) => {
  const remove = confirm("Are you sure do you want to delete this record?");
  if (remove) {
    isLoadingButton.value = true;
    await deleteEmployee(id);
    isLoadingButton.value = false;
    fetchEmployeesByCurrentRoute();
  }
};

const fetchEmployeesByCurrentRoute = (searchQuery) => {
  const routeParams = route.params;
  let defaultPage = 1; // default page is 1
  if (!searchQuery) defaultPage = routeParams.page;
  getPaginatedEmployees(defaultPage, routeParams.perPage, searchQuery);
};

const handleSearch = (value) => {
  fetchEmployeesByCurrentRoute(value);
};

onMounted(() => {
  fetchEmployeesByCurrentRoute();
});

watch(
  () => route.params,
  () => {
    fetchEmployeesByCurrentRoute();
  }
);
</script>
