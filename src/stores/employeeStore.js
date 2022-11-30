import { ref } from "vue";
import { defineStore } from "pinia";
import { retrievePaginatedEmployees, retrieveEmployees } from "../apis";

export const useEmployeeStore = defineStore("employee", () => {
  const employee = ref({
    employeeId: 0,
    name: "",
    birthday: null,
    isActive: false,
  });

  const paginatedEmployees = ref({
    pageIndex: 0,
    totalPages: 0,
    totalData: 0,
    data: [],
  });
  const employees = ref([]);
  const isSaving = ref(false);
  const isLoadingData = ref(false);

  const getEmployees = () => {
    isLoadingData.value = true;
    retrieveEmployees()
      .then((data) => {
        employees.value = data;
      })
      .then(() => {
        isLoadingData.value = false;
      });
  };

  const getPaginatedEmployees = (page, pageSize, query) => {
    isLoadingData.value = true;
    retrievePaginatedEmployees(page, pageSize, query)
      .then((data) => {
        paginatedEmployees.value = data;
      })
      .then(() => {
        isLoadingData.value = false;
      });
  };

  return {
    getEmployees,
    getPaginatedEmployees,
    paginatedEmployees,
    employees,
    employee,
    isSaving,
    isLoadingData,
  };
});
