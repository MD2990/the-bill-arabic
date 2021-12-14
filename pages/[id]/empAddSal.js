import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import AddSal from '../../components/sal/Add';
import Emp from '../../models/Emp';
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';

//Here we need {sal} to add a salary for specific employee
const empAddSal = ({ sal }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>
			<Hd title={`إضافة راتب للموظف: ${sal.emp_name}`} />
			<AddSal sal={sal} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
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
}

export default empAddSal;
