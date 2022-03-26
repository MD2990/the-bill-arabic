import { useRouter } from "next/router";
import React from "react";
import { dbConnect, jsonify } from "../../utils/dbConnect";
import Sal from "../../models/Sal";
import Edit_Delete_Sal from "../../components/sal/Edit_Delete_Sal";
import { Hd } from "../../components/comUtil/ComUtil";
import { convertToNumber } from "../../lib/funcs";
import moment from "moment";
import MySkeletons from "../../sharedComponents/MySkeletons";

export default function EmpEdit({ sal }) {
  const router = useRouter();

  if (router.isFallback || !sal) {
    return <MySkeletons />;
  }

  return (
    <>
      <Hd title={`تحديث راتب الموظف ${sal.emp_name}`} />
      <Edit_Delete_Sal sal={sal} />
    </>
  );
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  dbConnect();
  const data = await Sal.findById(params.id);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sal = await jsonify(data);
  sal.basic_salary = convertToNumber(sal.basic_salary);
  sal.bonus = convertToNumber(sal.bonus);
  sal.loans = convertToNumber(sal.loans);
  sal.total_salary = convertToNumber(sal.total_salary);
  sal.salary_date = moment(sal.salary_date).format("YYYY-MM-DD");

  return {
    props: {
      sal,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  dbConnect();
  const data = await Sal.find({});

  const sal = await jsonify(data);

  // Get the paths we want to pre-render based on posts
  const paths = sal.map((c) => ({
    params: { id: c._id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
