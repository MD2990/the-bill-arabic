import * as Yup from "yup";

const minDate = 2020 + "-" + 1 + "-" + 1;
const maxDate = 2099 + "-" + 12 + "-" + 31;
export const BILL_validationSchema = Yup.object().shape({
  details: Yup.string().trim().required(" البيانات مطلوبة"),
  advance: Yup.string().trim().required("المبلغ المدفوع مطلوب"),
  total_price: Yup.string().trim().required("المبلغ الإجمالي مطلوب"),
  //balance: Yup.string().trim().required("المبلغ المتبقي مطلوب"),
  bill_date: Yup.date()
    // .min(minDate, "يجب ان يكون تاريخ الفاتورة اكبر من هذا التاريخ ")
    //.max(maxDate, "يجب ان يكون تاريخ الفاتورة اقل من هذا التاريخ ")

    .required("تاريخ الفاتورة مطلوب"),
});

export const EMP_validationSchema = Yup.object().shape({
  emp_name: Yup.string().trim().required("اسم الموظف مطلوب"),
  job: Yup.string().trim().required(" المهنه مطلوبة"),
  civil_id: Yup.string().required("الرقم المدني أو الإقامة مطلوب"),
  passport_number: Yup.string().trim().required("رقم الجواز مطلوب"),
  empl_date: Yup.string().required("تاريخ التعيين مطلوب"),
  added_date: Yup.string().required("تاريخ الاضافة مطلوب"),
});

export const SAL_validationSchema = Yup.object().shape({
  basic_salary: Yup.string().trim().required("الراتب الاساسي مطلوب"),
  bonus: Yup.string().trim().required("المكافأة مطلوبة"),
  total_salary: Yup.string().trim().required("الراتب الإجمالي مطلوب"),
  salary_date: Yup.string().trim().required("تاريخ الراتب مطلوب"),
  loans: Yup.string().trim().required("القروض مطلوب"),
});
export const EXP_validationSchema = Yup.object().shape({
  elc: Yup.string().trim().required("الكهرباء مطلوب"),
  rent: Yup.string().trim().required("الإيجار مطلوب"),
  g_exp: Yup.string().trim().required("مصروفات الكراج مطلوب"),
  workPrice: Yup.string().trim().required("قيمة العمل مطلوبة"),
  other_exp: Yup.string().trim().required("المصروفات الأخرى مطلوبة"),
  added_date: Yup.string().trim().required("تاريخ الإضافة مطلوب"),
});

export const colors = {
  empLight: `green.400`,
  empDark: `green.600`,
  salLight: `blue.400`,
  salDark: `blue.600`,
  expLight: `gray.400`,
  expDark: `gray.500`,
  billLight: `orange.400`,
  billDark: `orange.500`,
};
