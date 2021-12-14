import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import BillArch from '../../models/BillArch';
import Edit_Delete_Arch_Bill from '../../components/bill_arch/Edit_Delete_Arch_Bill';
import { Hd, Spans } from '../../components/comUtil/ComUtil';

const EditCar = ({ bill }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}
	return (
		<>
			<Hd title={`تحديث الفاتورة رقم: ${bill.bill_number}`} />
			<Edit_Delete_Arch_Bill bill={bill} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await BillArch.findById(params.id);
	const bill = await jsonify(data);
	if (!bill) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			bill,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await BillArch.find({});
	const bill = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = bill.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default EditCar;
