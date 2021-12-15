import * as Yup from "yup";



 const minDate = 2020 + "-" + 1 + "-" + 1;
 const maxDate = 2099 + "-" + 12 + "-" + 31;
export const BILL_validationSchema = Yup.object().shape({
  company_name: Yup.string().trim().required("اسم الشركة مطلوب"),
  bill_number: Yup.string().trim().required("رقم الفاتورة مطلوب"),
  bill_type: Yup.string().trim().required("نوع الفاتورة مطلوب"),
  bill_amount: Yup.string().trim().required("قيمة الفاتورة مطلوب"),
  bill_date: Yup.date()
    .min(minDate, "يجب ان يكون تاريخ الفاتورة اكبر من هذا التاريخ ")
    .max(maxDate, "يجب ان يكون تاريخ الفاتورة اقل من هذا التاريخ ")
    
    .required("تاريخ الفاتورة مطلوب"),
});
