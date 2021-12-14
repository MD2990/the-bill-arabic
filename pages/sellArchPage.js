import React from 'react';
import useSWR from 'swr';
import { dbConnect, jsonify } from '../utils/dbConnect';
import ShowArchSells from '../components/sell_arch/ShowArchSells';
import DailySellArch from '../models/DailySellArch';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';

export default function sellArchPage(sell) {
	const { data, error } = useSWR('/api/SellArch', {
		initialData: sell,
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;
	return (
		<>
			<Hd title='أرشيف الدخل اليومي' />
			<ShowArchSells sellArch={data} />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await DailySellArch.find({});
	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const sell = await jsonify(data);

	return {
		props: {
			sell,
		},
		revalidate: 1,
	};
};
