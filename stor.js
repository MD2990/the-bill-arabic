import { m } from "framer-motion";
import moment from "moment";
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
  allSal: [],
  emp_id: null,
  empName: null,
  exp: [],
  empName: [],
  isFiltered: false,
  title: '',
  fromDate: '', 
  toDate:'',
});
export default state;
