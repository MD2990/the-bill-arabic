import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Emp from '../../models/Emp';
import Edit_Delete_Bill from "../../components/emp/Edit_Delete_Emp";
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';

const EmpEdit = ({ emp }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
    <>
      <Hd title={`تحديث بيانات الموظف : ${emp.emp_name}`} />
      <Edit_Delete_Bill emp={emp} />
    </>
  );
};

// This function gets called at build time
export async function getServerSideProps({ params }) {
  dbConnect();
  const data = await Emp.findById(params.id);
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const emp = await jsonify(data);
console.log(emp);

  return {
    props: {
      emp,
    },
    
  };
}


export default EmpEdit;
