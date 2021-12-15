import React from "react";
import useSWR from "swr";
import ShowBills from "../components/bill/ShowBills";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Bill from "../models/Bill";

import { Hd, Spans, Title } from "../components/comUtil/ComUtil";
import state from "../stor";

export default function ShowBillPage({ bills }) {

  const { data, error } = useSWR("/api/bill", {
    initialData: { bills },
   revalidateOnMount: true,
  });

  if (error)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!data) return <Spans />;
 state.bill = data.bill;

	
  return (
    <>
      <Hd title="عرض الفواتير" />
      <ShowBills billData={data.bill} />
    </>
  );
}
export const getStaticProps = async () => {
  await dbConnect();
  const data = await Bill.find({});
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const bills = await jsonify(data);


  return {
    props: {
      bills,
    },
    revalidate: 1,
  };
};
