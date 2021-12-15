import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { post, toCurrency } from "../../utils/dbConnect";

import {
  Wrap,
  Divider,
  Center,
} from "@chakra-ui/react";
import { BILL_validationSchema } from "../../lib/constants";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { useRouter } from "next/router";
import { getCurrentDate } from "../../lib/funcs";

export default function AddBill() {
  const router = useRouter();

  async function add(values) {
    values.bill_amount = toCurrency(values.bill_amount);
    await post("bill", values);
  }

  return (
    <Formik
      initialValues={{
        company_name: "",
        bill_number: "",
        bill_date: getCurrentDate(),
        bill_type: "كاش",
        bill_amount: "",
        payment_status: !!false,
        check_date: "2000-01-01",
        notes: "لا توجد",
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
              <Wrap justify="center" borderWidth="1px" borderRadius="lg" p="8">
                <CustomField
                  fieldName="company_name"
                  labelName="company_name"
                />
                <CustomField fieldName="bill_number" labelName="bill_number" />
                <CustomField
                  fieldName="bill_date"
                  labelName="bill_date"
                  type="date"
                />
                <CustomField fieldName="bill_type" labelName="bill_type" />
                <CustomField fieldName="bill_amount" labelName="bill_amount" />
                <CustomTextArea fieldName="notes" labelName="notes" />

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
