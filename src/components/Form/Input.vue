<template>
  <div>
    <label
      :for="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
    <input
      :type="type"
      :id="label"
      :value="value"
      @input="inputChanged"
      :class="inputClass"
      :placeholder="`Enter ${label}`"
    />
    <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errorMessage">
      <span class="font-medium">{{ errorMessage }}</span>
    </p>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { onMounted, ref, toRef, toRefs, watch } from "vue";
import { input, errorInput } from "../../constants";

const props = defineProps({
  type: String,
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
  },
  name: String,
  required: Boolean,
});
const emit = defineEmits("update:modelValue");

const defaultInputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const errorInputClass =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

let inputClass = ref(input);

const propRef = toRefs(props);
const nameRef = toRef(props, "name", "modelValue");
const { value, errorMessage } = useField(nameRef);
value.value = propRef.modelValue.value;

function inputChanged(e) {
  emit("update:modelValue", e.target.value);
}

onMounted(() => {
  inputClass.value = defaultInputClass;
});

watch(errorMessage, (newValue, oldValue) => {
  if (newValue) {
    inputClass.value = errorInputClass;
  } else {
    inputClass.value = defaultInputClass;
  }
});
</script>
