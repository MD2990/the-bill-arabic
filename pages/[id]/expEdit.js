import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Exp from '../../models/Exp';
import Edit_Delete_Exp from '../../components/exp/Edit_Delete_Exp';
import { Hd, Spans } from '../../components/comUtil/ComUtil';

const ExpEdit = ({ exp }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>		<Hd title={`تحديث الفاتورة رقم: ${exp.bill_number}`}/>
			<Edit_Delete_Exp formData={exp} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await Exp.findById(params.id);
	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const exp = await jsonify(data);

	return {
		props: {
			exp,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Exp.find({});
	const exp = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = exp.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default ExpEdit;
