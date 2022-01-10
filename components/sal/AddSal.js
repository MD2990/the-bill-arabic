import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { getSumToNum, post } from "../../utils/dbConnect";
import moment from "moment";
import { Wrap, Center, Divider, Text } from "@chakra-ui/react";
import { colors, SAL_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";
import { getItem, setItem } from "../../lib/funcs";

export default function AddSal({ empName }) {
  const router = useRouter();
  const { id } = router.query;

  async function addEmp(values) {
    await post("sal", values);
    setItem("bSal", values.basic_salary);
    setItem("bonus", values.bonus);
    setItem("loans", values.loans);
  }

  return (
    <Formik
      initialValues={{
        emp_name: empName,
        basic_salary: getItem("bSal") || "",
        bonus: getItem("bonus") || 0,
        loans: getItem("loans") || 0,
        total_salary: 0,
        emp_id: id,
        salary_date: moment().format("YYYY-MM-DD"),
        remarks: "لا توجد ملاحظات",
      }}
      onSubmit={async (values, actions) => {
        await addEmp(values);
        actions.setSubmitting(false);
      }}
      validationSchema={SAL_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title={`إضافة راتب للموظف `} color={colors().salDark}>
              <Text color={colors().salLight} as="span">
                {empName}
              </Text>
            </Title>
            <Center m="2" p="2">
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8" color={colors().salDark} >
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
