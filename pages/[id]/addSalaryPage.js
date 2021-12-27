import { useRouter } from 'next/router';
import React from 'react';

import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';
import AddSal from '../../components/sal/AddSal';
import { getItem } from '../../lib/funcs';
 
//Here we need {sal} to add a salary for specific employee
const AddSalaryPage = () => {
  const router = useRouter();
  const empName= getItem( 'emp');

  if (router.isFallback || !empName) {
    return <Spans />;
  }

  return (
    <>
      <Hd title={`إضافة راتب للموظف: ${empName||" . . ."}`} />
      <AddSal empName={empName}/>
    </>
  );
};

// This function gets called at build time
/*  export async function getStaticProps({ params }) {
	dbConnect();
	const data = await Emp.findById(params.id);
	const sal = await jsonify(data);
	if (!sal) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			sal,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Emp.find({});
	const sal = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = sal.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
} */ 

export default AddSalaryPage;
