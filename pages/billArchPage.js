import React from 'react';
import useSWR from 'swr';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';
import ShowArchBills from '../components/bill_arch/ShowArchBills';
import { dbConnect, jsonify } from '../utils/dbConnect';
import BillArch from '../models/BillArch';
export default function billArch({ bill }) {
	const { data, error } = useSWR('/api/BillArch', {
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
			<Hd title='أرشيف الفواتير' />
			<ShowArchBills arch={data} />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await BillArch.find({});
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
