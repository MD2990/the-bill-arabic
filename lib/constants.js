import * as Yup from "yup";

const minDate = 2020 + "-" + 1 + "-" + 1;
const maxDate = 2099 + "-" + 12 + "-" + 31;
export const BILL_validationSchema = Yup.object().shape({
  details: Yup.string().trim().required(" البيانات مطلوبة"),
  advance: Yup.string().trim().required("المبلغ المدفوع مطلوب"),
  total_price: Yup.string().trim().required("المبلغ الإجمالي مطلوب"),
  //balance: Yup.string().trim().required("المبلغ المتبقي مطلوب"),
  bill_date: Yup.date()
    .min(minDate, "يجب ان يكون تاريخ الفاتورة اكبر من هذا التاريخ ")
    .max(maxDate, "يجب ان يكون تاريخ الفاتورة اقل من هذا التاريخ ")

    .required("تاريخ الفاتورة مطلوب"),
});
