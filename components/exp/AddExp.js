import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { post, toCurrency } from "../../utils/dbConnect";
import { Wrap, Divider, Center } from "@chakra-ui/react";
import { EXP_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";
import moment from "moment";

export default function AddExp() {
  const router = useRouter();

  async function add(values) {
    await post("exp", values);
  }

  return (
    <Formik
      initialValues={{
        elc: "",
        rent: "",
        g_exp: "",
        workPrice: "",
        other_exp: 0,
        total_profit: "",
        total_loss: "",
        added_date: moment().format("YYYY-MM-DD"),
        remarks: "لا توجد ",
      }}
      onSubmit={async (values, actions) => {
        await add(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={EXP_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title="إضافة مصروفات" />
            <Center m="2" p="2">
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8">
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

                <FormBottomButton router={router} props={props} />
              </Wrap>
            </Center>
          </Form>
        );
      }}
    </Formik>
  );
}
