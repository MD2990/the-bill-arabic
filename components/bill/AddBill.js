import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { post, toCurrency } from "../../utils/dbConnect";

import { Wrap, Divider, Center } from "@chakra-ui/react";
import { BILL_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";
import {  getCurrentDateTime } from "../../lib/funcs";
import moment from "moment";

export default function AddBill() {
  const router = useRouter();

  async function add(values) {
    // values.advance = toCurrency(values.advance);
    await post("bill", values);
  }

  return (
    <Formik
      initialValues={{
        details: "",
        bill_date: getCurrentDateTime(), 
        advance: "",
        total_price: "",
        balance: 0,
        remarks: "",
      }}
      onSubmit={async (values, actions) => {
        await add(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={BILL_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title title="إضافة فاتورة" />
            <Center m="2" p="2">
              <Wrap
                justify="center"
                borderWidth="1px"
                borderRadius="lg"
                p="8"
            
              >
                <CustomField
                  fieldName="bill_date"
                  labelName="التاريخ"
                  type="datetime-local"
                />
                <CustomTextArea fieldName="details" labelName="التفاصيل" />

                <CustomField
                  fieldName="total_price"
                  type="number"
                  labelName="المجموع"
                />
                <CustomField
                  fieldName="advance"
                  type="number"
                  labelName="المدفوع"
                />
                <CustomFieldWithValue
                  fieldName="balance"
                  labelName="المتبقي"
                  values={
                    toCurrency(
                      props.values.total_price - props.values.advance
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
