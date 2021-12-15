import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Edit_Delete_Bill from '../../components/bill/Edit_Delete_Bill';
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';
import Bill from '../../models/Bill';

const EditBill = ({ bill }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>
			<Hd title={`تحديث الفاتورة رقم: ${bill.bill_number}`} />
		<Edit_Delete_Bill bill={bill} />
		</>
	);
};

// This function gets called at build time
export async function getServerSideProps({ params }) {
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
	
	};
}


export default EditBill;
