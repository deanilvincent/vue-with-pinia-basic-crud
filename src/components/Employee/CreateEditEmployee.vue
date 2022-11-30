<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="grid grid-cols-4 gap-5">
        <FormInput name="name" label="Name" type="text" v-model="form.name" />
        <DatePicker name="birthday" label="Birthday" v-model="form.birthday" />
        <Toggle class="mt-8" label="Is Active?" v-model="form.isActive" />
      </div>
      <div class="pt-3">
        <Button
          type="submit"
          :text="`${!form.employeeId ? 'Create' : 'Update'}`"
          class-type="success"
          :is-loading="isSavingButton"
        />
        <Button
          type="reset"
          text="Cancel"
          v-if="form.employeeId"
          class-type="info"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
import moment from "moment";
import FormInput from "../Form/Input.vue";
import Button from "../Button.vue";
import Toggle from "../Toggle.vue";
import DatePicker from "../DatePicker.vue";
import { Form, useForm } from "vee-validate";
import * as Yup from "yup";
import { ref, watch } from "vue";
import { useEmployeeStore } from "../../stores";
import { storeToRefs } from "pinia";
import { addEmployee, updateEmployee } from "../../apis";
import { dateInputFormat } from "../../helpers";
import { useRoute } from "vue-router";

// STORE
const employeeStore = useEmployeeStore();
const { getPaginatedEmployees } = employeeStore;
const { employee, isSaving } = storeToRefs(employeeStore);

const isSavingButton = ref(isSaving);

const form = ref({
  employeeId: 0,
  isActive: true,
  name: "",
  birthday: dateInputFormat(new Date()),
});

const route = useRoute();

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  birthday: Yup.string()
    .required("Date of Birth is required")
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      "Date of Birth must be a valid date in the format YYYY-MM-DD"
    ),
});

// Create a form context with the validation schema
const { handleSubmit } = useForm();

const onSubmit = handleSubmit(() => {
  // CREATE
  const employeeToSave = {
    employeeId: form.value.employeeId,
    name: form.value.name,
    birthday: form.value.birthday,
    isActive: form.value.isActive,
  };

  if (!employeeToSave.employeeId) {
    isSaving.value = true;
    addEmployee(employeeToSave)
      .then((data) => {
        getPaginatedEmployees(route.params.page, route.params.perPage);
      })
      .catch((e) => {
        console.log("ERROR", e.message);
      })
      .then(() => {
        isSaving.value = false;
      });
  } else {
    updateEmployee(employeeToSave)
      .then((data) => {
        getPaginatedEmployees(route.params.page, route.params.perPage);
      })
      .catch((e) => {
        console.log("ERROR", e.message);
      });
  }
  resetForm();
}, onInvalidSubmit);

const resetForm = () => {
  form.value.employeeId = 0;
  form.value.name = "";
  form.value.birthday = moment(new Date()).format("YYYY-MM-DD");
  form.value.isActive = true;
};

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}

// WATCH
watch(employee, (newValue, oldValue) => {
  if (employee.value) {
    const selectedEmployee = employee.value;
    form.value = {
      employeeId: selectedEmployee.employeeId,
      name: selectedEmployee.name,
      isActive: selectedEmployee.isActive,
      birthday: dateInputFormat(selectedEmployee.birthday),
    };
  }
});
</script>
