<template>
  <div>
    <div class="relative">
      <label
        :for="label"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ label }}</label
      >
      <div
        class="flex absolute inset-y-0 left-0 items-center pt-6 pl-3 pointer-events-none"
      >
        <!-- <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg> -->
      </div>
      <input
        type="date"
        :value="value"
        @input="inputDateChanged"
        :class="inputClass"
        placeholder="Select date"
      />
      <p
        class="mt-2 text-sm text-red-600 dark:text-red-500"
        v-if="errorMessage"
      >
        <span class="font-medium">{{ errorMessage }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { toRef, watch, ref, toRefs } from "vue";
import { useField } from "vee-validate";
import moment from "moment";

const props = defineProps({
  label: String,
  modelValue: {
    type: [String, Date],
  },
  name: String,
});
const emit = defineEmits("update");

const defaultInputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const errorInputClass =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

let inputClass = ref(defaultInputClass);

const propRef = toRefs(props);
const nameRef = toRef(props, "name");
const { value, errorMessage } = useField(nameRef);
value.value = moment(propRef.modelValue.value).format("YYYY-MM-DD");

function inputDateChanged(e) {
  emit("update:modelValue", e.target.value);
}

watch(errorMessage, (newValue, oldValue) => {
  if (newValue) {
    inputClass.value = errorInputClass;
  } else {
    inputClass.value = defaultInputClass;
  }
});
</script>
