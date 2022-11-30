import moment from "moment";

export const dateInputFormat = (value) => moment(value).format("YYYY-MM-DD");
