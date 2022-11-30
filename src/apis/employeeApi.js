import axios from "axios";

export const retrieveEmployees = async () => {
  try {
    const response = await axios.get(`employees`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const retrievePaginatedEmployees = async (page, pageSize, query) => {
  try {
    if (!query) {
      query = "";
    }
    const response = await axios.get(`employees/${page}/${pageSize}/${query}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`employees`, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await axios.put(
      `employees/${employee.employeeId}`,
      employee
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
