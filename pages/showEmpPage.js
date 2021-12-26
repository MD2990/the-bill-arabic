import useSWR from 'swr';
import ShowEmp from "../components/emp/ShowEmp";
import { dbConnect, jsonify } from '../utils/dbConnect';
import Emp from '../models/Emp';
import { Hd, Spans, Title } from '../components/comUtil/ComUtil';
import state from "../stor";

export default function ShowEmpPage({ emp }) {
	
	const { data, error } = useSWR('/api/emp', {
		initialData: { emp },
		revalidateOnMount: true,
	});

	if (error)
		return (
			<Title title='حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى' />
		);
	if (!data) return <Spans />;

	 state.emp = data.emp.sort((a, b) => (a.added_date < b.added_date ? 1 : -1));

	 console.log(state.emp);

	return (
    <>
      <Hd title="عرض بيانات الموظفين" />

      <ShowEmp  />
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
