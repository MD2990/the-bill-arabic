import useSWR from 'swr';
import ShowSells from '../components/sell/ShowSells';
import { dbConnect, jsonify } from '../utils/dbConnect';
import DailySell from '../models/DailySell';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';

export default function showSellPage(sell) {
	const { data, error } = useSWR('/api/sells', {
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
			<Hd title='عرض الدخل اليومي' />
			<ShowSells carData={data} />;
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await DailySell.find({});
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
};
