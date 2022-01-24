import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Sal from '../../models/Sal';
import Edit_Delete_Sal from '../../components/sal/Edit_Delete_Sal';
import { Hd } from '../../components/comUtil/ComUtil';
import { convertToNumber } from "../../lib/funcs";
import moment from "moment";
import MySkeletons from '../../sharedComponents/MySkeletons';

const EmpEdit = ({ sal }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <MySkeletons />;
  }

  return (
    <>
      <Hd title={`تحديث راتب الموظف ${sal.emp_name}`} />
      <Edit_Delete_Sal sal={sal} />
    </>
  );
};

// This function gets called at build time
export async function getServerSideProps({ params }) {
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
    //revalidate: 1,
  };
}

export default EmpEdit;
