# Vue.JS with Pinia Basic CRUD

## What is Pinia?
Pinia is a store library for Vue. This store library allows the application to store, share and modify states within the Vue.JS application. One of the advantages of Pinia over Vuex is that, Pinia is more intuitive and easier to learn and implement. These store libraries have their own pros and cons but it's still your option whether to use Vuex or Pinia. Visit [Pinia](https://pinia.vuejs.org/)'s official website.

For this README.md, we're using the get method but you can explore the other methods like the Create, Update and Delete.

## Setup and configuration

1. Install the package:
```
npm install pinia
```
2. Update the `main.js` file.
```
import { createApp } from "vue";
import { createPinia } from "pinia"; // Import

const app = createApp(App)

app.use(createPinia()); // Include pinia to the app
app.mount("#app")
```

Source: [main.js](./src/main.js)

3. Create a store/ directory and add the store file there. In our example, we use `useEmployeeStore` method name. Adding `use` at the beginning of the store is optional but, it's a good naming convention.
```
import { ref } from "vue"
import { defineStore } from "pinia"

export const useEmployeeStore = defineStore("employee", () => {
    // state
    const paginatedEmployees = ref({
        pageIndex: 0,
        totalPages: 0,
        totalData: 0,
        data: [],
    })
    
    // method
    const getPaginatedEmployees = (page, pageSize, query) => {
        ...
        paginatedEmployees.value = data;
        ...
    }
    
    // expose available state and method.
    return { paginatedEmployees, getPaginatedEmployees }
}
```
Source: [employeeStore.js](./src/stores/employeeStore.js)

## Basic usage
```
<template>
    <div>
        <tr v-for="employee in paginatedEmployees.data" :key="employee.id">
            ...
        </tr>
    </div>
</template>

<script setup>
// import the store
import { useEmployeeStore } from "../../stores"
import { storeToRefs } from "pinia"

// call the store
const employeeStore = useEmployeeStore()
const { getPaginatedEmployees } = useEmployeeStore()
const { paginatedEmployees } = storeToRefs(employeeStore)
...
```
You can use the `getPaginatedEmployees` method whether onMount or from on-demand methods.

Source: [ListOfEmployee.vue](./src/components/Employee/ListOfEmployee.vue)

To extract properties from the store while keeping its reactivity, we use the `storeToRefs()`. This will create `refs` for every reactive property. This is also useful when we only using state from the store but not calling any action.

## Contribute
Feel free to share, or even clone or fork this project: https://github.com/deanilvincent/vuejs3-with-pinia-basic-crud.git

Contribution & pull request is welcome!

I'll be glad if you give this project a ★ on Github :))

## License
This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.
