import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import {
  EMP_validationSchema, SAL_validationSchema,
} from "../../lib/constants";
import { handlePut, handleDelete, getSumToNum } from "../../utils/dbConnect";
import { getItem, handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Sal({ sal }) {
  const router = useRouter();

  const {
      basic_salary,
        bonus,
        loans,
        total_salary,
        emp_id,
        salary_date,
      remarks,
        _id,
  } = sal;

  async function put(values) {
    handlePut({ values, url: "sal", router });
    router.back();
  }

  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "sal",
      id: _id,
      handleDelete,
      router,
    });
  }
  return (
    <Formik
      initialValues={{
        _id,
        basic_salary,
        bonus,
        loans,
        total_salary,
        emp_id,
        salary_date,
        remarks,
      }}
      onSubmit={async (values, actions) => {
        await put(values);
        actions.setSubmitting(false);
      }}
      validationSchema={SAL_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title={`تحديث راتب الموظف:   `} color={"blue.600"}>
              <Text as="span" color={"blue.300"}>
                {" "}
                {getItem("emp")?.toUpperCase()}{" "}
              </Text>
            </Title>
            <Center m="2" p="2">
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8">
                <CustomField
                  fieldName="basic_salary"
                  labelName="الراتب الأساسي"
                  type="number"
                />
                <CustomField
                  fieldName="bonus"
                  labelName="العلاوات"
                  type="number"
                />
                <CustomField
                  fieldName="loans"
                  labelName="القروض"
                  type="number"
                />
                <CustomFieldWithValue
                  forSalary
                  fieldName="total_salary"
                  labelName="الراتب الإجمالي"
                  values={getSumToNum(
                    props.values.basic_salary,
                    props.values.bonus,
                    props.values.loans
                    )}
                />
                <CustomField
                  fieldName="salary_date"
                  labelName="تاريخ الراتب"
                  type="date"
                />

                <CustomTextArea fieldName="remarks" labelName="ملاحظات" />

                    <CustomField
                      fieldName="_id"
                  labelName="الرمز التعريفي"
                  disabled
                     
                    />
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
