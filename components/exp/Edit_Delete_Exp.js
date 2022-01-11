import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { handlePut, handleDelete, toCurrency } from "../../utils/dbConnect";
import { Wrap, Divider, Center } from "@chakra-ui/react";
import { colors, EXP_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";
import { handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Exp({ exp }) {
  const router = useRouter();

  const {
    elc,
    rent,
    g_exp,
    workPrice,
    other_exp,
    total_profit,
    total_loss,
    added_date,
    remarks,
    _id,
  } = exp;

  async function put(values) {
    handlePut({ values, url: "exp", router });
    router.replace("/showExpPage");
  }
  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "exp",
      id: _id,
      handleDelete,
      router,
    });
  }
  return (
    <Formik
      initialValues={{
        elc,
        rent,
        g_exp,
        workPrice,
        other_exp,
        total_profit,
        total_loss,
        added_date,
        remarks,
      }}
      onSubmit={async (values, actions) => {
        await put(values);
        actions.setSubmitting(false);
        
      }}
      validationSchema={EXP_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title="إضافة مصروفات" color={colors.expDark} />
            <Center m="2" p="2">
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8" color={colors.expDark} >
                <CustomField
                  fieldName="added_date"
                  labelName="التاريخ"
                  type="date"
                />

                <CustomField
                  type="number"
                  fieldName="workPrice"
                  labelName="قيمة العمل"
                />

                <CustomField
                  fieldName="elc"
                  type="number"
                  labelName="الكهرباء"
                />
                <CustomField
                  fieldName="rent"
                  type="number"
                  labelName="الإيجار"
                />
                <CustomField
                  fieldName="g_exp"
                  type="number"
                  labelName="مصروفات الكراج"
                />
                <CustomField
                  fieldName="other_exp"
                  type="number"
                  labelName="مصروفات أخرى"
                />

                <CustomFieldWithValue
                  fieldName="total_loss"
                  labelName=" الخسائر"
                  forSalary
                  values={
                    toCurrency(
                      props.values.elc +
                        props.values.rent +
                        props.values.g_exp +
                        props.values.other_exp
                    ) || 0
                  }
                />
                <CustomFieldWithValue
                  fieldName="total_profit"
                  labelName="إجمالي الربح"
                  forSalary
                  values={
                    toCurrency(
                      props.values.workPrice -
                        (props.values.elc +
                          props.values.rent +
                          props.values.g_exp +
                          props.values.other_exp)
                    ) || 0
                  }
                />

                <CustomTextArea fieldName="remarks" labelName="الملاحظات" />

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
