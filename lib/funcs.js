import moment from "moment";
import Swal from "sweetalert2";
//  get the current date and format it to YYYY-MM-DD
export const getCurrentDate = () => moment().format("YYYY-MM-DD ,  hh:mm a");

export function getRandomMinAndMaxNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function addNumbers(a, b, c) {
  if (isNaN(a) || isNaN(b) || isNaN(c)) return 0;
  if (typeof a !== "number" || typeof b !== "number" || c !== "number")
    return 0;

  const sum = parseInt(a) + parseInt(b) + parseInt(c);
  return sum;
}

// create a function that will return  today's date and time in YYYY-MM-DD hh:mm:ss format
export const getCurrentDateTime = () => moment().format("YYYY-MM-DDTHH:mm:ss");
export const setCurrentDateTime = (date) =>
  moment(date).format("YYYY-MM-DDTHH:mm:ss");

// create a function that will sub string from a string

export const cutString = (string, start, end) => {
  if (string.length < end) return string;
  return string.substring(start || 18, end || 24);
};

// convert a date from form to YYYY-MM-DD
export function convertDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const d = day < 10 ? "0" + day : day;
  return `${year}-${month}-${d}`;
}

export const myFilter = ({ arr, searchTerm }) => {
  const results = arr.filter((e) => {
    return Object.keys(e).some((key) =>
      e[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  return results;
};

export const today = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  //call the function to add the leading zero
  const d = dd < 10 ? "0" + dd : dd;

  const date = yyyy + "-" + mm + "-" + d;
  return date;
};
// get the  inputed date and return the date in the format of yyyy-mm-dd
export const getDate = (theDate) => {
  var today = new Date(theDate);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  //call the function to add the leading zero
  const d = dd < 10 ? "0" + dd : dd;

  const date = yyyy + "-" + mm + "-" + d;
  return date;
};

export async function handleFormDelete({
  deleteUrl,
  id,
  handleDelete,
  router,
  secondDelete,
}) {
  await Swal.fire({
    title: "هل أنت متأكد ؟ ",
    text: "لن تستطيع عكس عملية الحذف مرة أخرى !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "إلغاء",

    confirmButtonText: "نعم, قم بالحذف !",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete({ deleteUrl, id });

      if (secondDelete) {
        secondDelete();
      }
      router && router.back();
    }
  });
}
export const convertToNumber = (str) => {
  return parseFloat( Number(str.replace(/[^0-9.-]+/g, "")).toFixed(2));
};

//create a function to save a value in a local storage
export const setItem = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

//retrieve a value from a local storage
export const getItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

// remove a value from a local storage
export const removeItem = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// clear all values from a local storage
export const clearAll = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

export const errorMsg = () => {
  Swal.fire({
    title: "حدث خطأ أثناء العملية, الرجاء المحاولة مجددا",
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

export const successMsg = (msg = "تمت اللإضافة بنجاح") => {
  Swal.fire({
    title: msg,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
};



export const reverseString = (str) => str.split("-").reverse().join("-");