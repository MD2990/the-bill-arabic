import { useRouter } from "next/router";
import React from "react";
import { dbConnect, jsonify } from "../../utils/dbConnect";
import Edit_Delete_Bill from "../../components/bill/Edit_Delete_Bill";
import { Hd } from "../../components/comUtil/ComUtil";
import Bill from "../../models/Bill";
import {
  convertToNumber,
  cutString,
  setCurrentDateTime,
} from "../../lib/funcs";
import MySkeletons from "../../sharedComponents/MySkeletons";

export default function EditBill({ bill }) {
  const router = useRouter();

  if (router.isFallback || !bill) {
    return <MySkeletons />;
  }

  return (
    <>
      <Hd title={`تحديث الفاتورة رقم: ${cutString(router.query.id, 18, 24)}`} />
      <Edit_Delete_Bill bill={bill} />
    </>
  );
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  dbConnect();

  const data = await Bill.findById(params.id);
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const bill = await jsonify(data);

  // remove all non-numeric characters except for decimal point

  bill.total_price = convertToNumber(bill.total_price);
  bill.advance = convertToNumber(bill.advance);

  return {
    props: {
      bill,
    },
    revalidate: 1,
  };
}


export async function getStaticPaths() {
  dbConnect();
  const data = await Bill.find({});

  const bill = await jsonify(data);

  // Get the paths we want to pre-render based on posts
  const paths = bill.map((c) => ({
    params: { id: c._id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
