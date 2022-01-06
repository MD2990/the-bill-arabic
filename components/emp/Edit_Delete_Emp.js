import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { colors, EMP_validationSchema } from "../../lib/constants";
import { handlePut, handleDelete } from "../../utils/dbConnect";
import { handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Emp({ emp }) {
  const router = useRouter();

  const {
    emp_name,
    job,
    civil_id,
    passport_number,
    empl_date,
    added_date,
    remarks,
    _id,
  } = emp;

  async function put(values) {
    handlePut({ values, url: "emp", router });
    router.replace("/showEmpPage");
  }

  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "emp",
      id: _id,
      handleDelete,
      router,
    });
  }
  return (
    <Formik
      initialValues={{
        emp_name,
        job,
        civil_id,
        passport_number,
        empl_date,
        added_date,
        remarks,
      }}
      onSubmit={async (values, actions) => {
        await put(values);
        actions.setSubmitting(false);
      }}
      validationSchema={EMP_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title={`تحديث بيانات  الموظف:   `} color={colors().empDark}>
              <Text as="span" color={colors().empLight}>
                {" "}
                {emp_name.toUpperCase()}{" "}
              </Text>
            </Title>
            <Center m="2" p="2">
              <Wrap
                justify="center"
                borderWidth="1px"
                borderRadius="lg"
                p="8"
                color={colors().empLight}
              >
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

                <FormBottomButton
                  router={router}
                  props={props}
                  deleteBtn
                  onDelete={FormDeleteFunc}
                />
              </Wrap>
            </Center>
          </Form>
        );
      }}
    </Formik>
  );
}
