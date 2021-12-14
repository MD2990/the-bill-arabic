import useSWR from 'swr';
import Show from '../components/emp/Show';
import { dbConnect, jsonify } from '../utils/dbConnect';
import Emp from '../models/Emp';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';

export default function Exps({ emp }) {
	const { data, error } = useSWR('/api/emp', {
		initialData: { emp },
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;

	return (
		<>
			<Hd title='عرض بيانات الموظفين' />
			<Show emp={data} />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await Emp.find({});
	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const emp = await jsonify(data);

	return {
		props: {
			emp,
		},
		revalidate: 1,
	};
};
