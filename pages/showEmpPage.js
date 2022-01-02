import useSWR from 'swr';
import ShowEmp from "../components/emp/ShowEmp";
import { dbConnect, jsonify } from '../utils/dbConnect';
import Emp from '../models/Emp';
import { Btn, Hd, Spans, Title } from '../components/comUtil/ComUtil';
import state from "../stor";
import { Center, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { colors } from "../lib/constants";

export default function ShowEmpPage({ emp }) {
  const router = useRouter();
  const { data, error } = useSWR("/api/emp", {
    initialData: { emp },
    revalidateOnMount: true,
  });

  if (error)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!data) return <Spans />;

  if (data.emp?.length < 1)
    return (
      <>
        <Title
          title="لم يتم إضافة موظفين إلى الآن ..."
          color={colors().empLight}
        ></Title>
        <Center my={["1%", "2%", "3%", "4%"]}>
          <Btn
            fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
            p={["1rem", "1.5rem", "2rem", "2.5rem"]}
            click={() => router.replace(`/addNewEmpPage`)}
            title="  إضافة موظف جديد"
            icon={<AddIcon />}
            color={colors().empLight}
          ></Btn>
        </Center>
      </>
    );

  return (
    <>
      <Hd title="عرض بيانات الموظفين" />

      <ShowEmp emp={data.emp} />
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
