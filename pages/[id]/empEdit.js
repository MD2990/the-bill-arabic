import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Emp from '../../models/Emp';
import Edit_Delete from '../../components/emp/Edit_Delete';
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';

const EmpEdit = ({ emp }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>
			<Hd title={`تعديل بيانات الموظف : ${emp.emp_name}`}/>
			<Edit_Delete emp={emp} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await Emp.findById(params.id);
	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const emp = await jsonify(data);

	return {
		props: {
			emp,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Emp.find({});
	const emp = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = emp.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default EmpEdit;
