import moment from "moment";

export const globalFilters = {
  readableDate(value) {
    return moment(value).format("MM/DD/YYYY");
  },
  readableDateTime(value) {
    return moment(value).format("MM/DD/YYYY HH:mm");
  },
};
