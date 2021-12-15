import { proxy } from "valtio";

const state = proxy({
  paymentText: "Filleter by Payment",
  paid: false,
  searchTerm: "",
  searchResults: [],
  data: [],
  bill: [],
  currentPage: parseInt(0),
  pageCount: null,
  PER_PAGE: 8,
  offset: 0,
  emp: [],
  sal: [],
  emp_id: null,
  empName: null,
  exp: [],
  empName: [],
});
export default state;
