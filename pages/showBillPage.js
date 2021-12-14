import React from 'react';
import useSWR from 'swr';
import ShowBills from '../components/bill/ShowBills';
import { dbConnect, jsonify } from '../utils/dbConnect';
import Bill from '../models/Bill';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';

export default function showBillPage({ bill }) {
	const { data, error } = useSWR('/api/bills', {
		initialData: { bill },
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;
	return (
		<>
			<Hd title='عرض الفواتير' />
			<ShowBills billData={data} />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await Bill.find({});
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
};
