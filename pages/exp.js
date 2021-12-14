import useSWR from 'swr';
import Show from '../components/exp/Show';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';
import { dbConnect, jsonify } from '../utils/dbConnect';
import Exp from '../models/Exp';
export default function Exps(exp) {
	const { data, error } = useSWR('/api/exp', {
		initialData: exp,
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;
	return (
		<>
			<Hd title='عرض المصروفات' />

			<Show exp={data} />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await Exp.find({});
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
};
