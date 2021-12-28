import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Sal from '../../models/Sal';
import Edit_Delete_Sal from '../../components/sal/Edit_Delete_Sal';
import { Hd, Spans } from '../../components/comUtil/ComUtil';

const EmpEdit = ({ sal }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}


	return (
    <>
      <Hd title={`تحديث راتب الموظف ${'sal.emp_name'}`} />
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
				destination: '/',
				permanent: false,
			},
		};
	}
	const sal = await jsonify(data);

	return {
		props: {
			sal,
		},
		//revalidate: 1,
	};
}

export default EmpEdit;
