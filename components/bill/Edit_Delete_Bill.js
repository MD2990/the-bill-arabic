import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
} from "../../comUtil/ComUtil";
import { BILL_validationSchema } from "../../lib/constants";
import { handlePut,handleDelete } from "../../utils/dbConnect";
import { handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Bill({ bill }) {
  const router = useRouter();

  const {
    company_name,
    bill_number,
    bill_date,
    bill_type,
    bill_amount,
    payment_status,
    check_date,
    _id,
    notes,
  } = bill;

   async function put(values) {

	
		handlePut({values, url:'bill', router});
		router.replace('/showBillPage');
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
        company_name,
        bill_number,
        bill_date,
        bill_type,
        bill_amount,
        payment_status,
        check_date,
        notes,
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
