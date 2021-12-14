import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import DailySell from '../../models/DailySell';
import Edit_Delete from '../../components/sell/Edit_Delete';
import { Hd, Spans } from '../../components/comUtil/ComUtil';

const EditSell = ({ sell }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}
	return (
		<>
						<Hd title='تحديث الدخل اليومي'/>
			<Edit_Delete sell={sell} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await DailySell.findById(params.id);
	const sell = await jsonify(data);
	if (!sell) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			sell,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await DailySell.find({});
	const sell = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = sell.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default EditSell;
