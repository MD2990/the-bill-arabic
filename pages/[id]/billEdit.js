import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Edit_Delete_Bill from '../../components/bill/Edit_Delete_Bill';
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';
import Bill from '../../models/Bill';
import Head from 'next/head';

const EditBill = ({ bill }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>
			<Hd title={`تحديث الفاتورة رقم: ${bill.bill_number}`} />
			<Edit_Delete_Bill formData={bill} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();

	const data = await Bill.findById(params.id);
	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const bill = await jsonify(data);

	return {
		props: {
			bill,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Bill.find({});
	const bill = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = bill.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default EditBill;
