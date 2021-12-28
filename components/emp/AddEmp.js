import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { post } from "../../utils/dbConnect";
import moment from "moment";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { EMP_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";

export default function AddEmp() {
  const router = useRouter();

  async function addEmp(values) {
    await post("emp", values);
  }

  return (
    <Formik
      initialValues={{
        emp_name: "",
        job: "",
        civil_id: "",
        passport_number: "",
        empl_date: moment().format("YYYY-MM-DD"),
        added_date: moment().format("YYYY-MM-DD"),
        remarks: "لا توجد ملاحظات",
      }}
      onSubmit={async (values, actions) => {
        await addEmp(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={EMP_validationSchema}
    >
      {(props) => {
        return (
          <Form className="wr">
            <Title title="إضافة موظف جديد" />
            <Center m="2" p="2">
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8">
                <CustomField fieldName="emp_name" labelName="اسم العامل" />
                <CustomField fieldName="job" labelName="المهنة" />
                <CustomField fieldName="civil_id" labelName="الرقم المدني" />
                <CustomField
                  fieldName="passport_number"
                  labelName="رقم الجواز"
                />
                <CustomField
                  fieldName="empl_date"
                  labelName="تاريخ التعيين"
                  type="date"
                />
                <CustomField
                  fieldName="added_date"
                  labelName="تاريخ الاضافة"
                  type="date"
                />
                <CustomTextArea fieldName="remarks" labelName="ملاحظات" />

                <Divider />

                <FormBottomButton router={router} props={props} />
              </Wrap>
            </Center>
          </Form>
        );
      }}
    </Formik>
  );
}
