import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { BILL_validationSchema, colors } from "../../lib/constants";
import { handlePut, handleDelete, toCurrency } from "../../utils/dbConnect";
import { cutString, handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Bill({ bill }) {
  const router = useRouter();

  const { details, bill_date, advance, total_price, balance, remarks, _id } =
    bill;

  async function put(values) {
    handlePut({ values, url: "bill", router });
    router.replace("/showBillPage");
  }

  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "bill",
      id: _id,
      handleDelete,
      router,
    });
  }
  return (
    <Formik
      initialValues={{
        details,
        bill_date,
        advance,
        total_price,
        balance,
        remarks,
      }}
      onSubmit={async (values, actions) => {
        await put(values);
        actions.setSubmitting(false);
      }}
      validationSchema={BILL_validationSchema}
    >
      {(props) => {
        return (
          <Form>
            <Title
              title={`تحديث الفاتورة رقم: ${cutString(_id, 18, 24)}`}
              color={colors.billDark}
            />
            <Center m="2" p="2">
              <Wrap
                justify="center"
                borderWidth="1px"
                borderRadius="lg"
                p="8"
                color={colors.billLight}
              >
                <CustomField
                  fieldName="bill_date"
                  labelName="التاريخ"
                  type="date"
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
