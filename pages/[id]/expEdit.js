import { useRouter } from "next/router";
import React from "react";
import { dbConnect, jsonify } from "../../utils/dbConnect";
import Edit_Delete_Exp from "../../components/exp/Edit_Delete_Exp";
import { Hd, } from "../../components/comUtil/ComUtil";
import Exp from "../../models/Exp";
import {
  convertToNumber,
  cutString,

} from "../../lib/funcs";
import MySkeletons from "../../sharedComponents/MySkeletons";

const EditExp = ({ exp }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <MySkeletons />;
  }

  return (
    <>
      <Hd title={`تحديث الفاتورة رقم: ${cutString(router.query.id, 18, 24)}`} />
      <Edit_Delete_Exp exp={exp} />
    </>
  );
};

// This function gets called at build time
export async function getServerSideProps({ params }) {
  dbConnect();

  const data = await Exp.findById(params.id);
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
	const exp = await jsonify(data);
	

  // remove all non-numeric characters except for decimal point

  exp.elc = convertToNumber(exp.elc);
   exp.rent = convertToNumber(exp.rent);
  exp.g_exp = convertToNumber(exp.g_exp);
  exp.workPrice = convertToNumber(exp.workPrice);
  exp.other_exp =   convertToNumber(exp.other_exp);



  return {
    props: {
      exp,
    },
  };
}

export default EditExp;
