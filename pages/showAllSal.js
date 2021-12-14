import useSWR from 'swr';
import ShowAll from '../components/sal/ShowAll';
import { dbConnect, jsonify } from '../utils/dbConnect';
import Sal from '../models/Sal';
import { Hd, Spans,Title } from '../components/comUtil/ComUtil';

export default function showAllSal({ sal }) {


	const { data, error } = useSWR('/api/sal', {
		initialData: {sal},
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;
	return (
		<>
			<Hd title={`عرض الرواتب`} />
			<ShowAll sal={data} />
		</>
	);
}
// This function gets called at build time
export async function getStaticProps() {
	dbConnect();
	const data = await Sal.find({});

	const sal = await jsonify(data);
	if (!sal) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			sal,
		},
		revalidate: 1,
	};
}
