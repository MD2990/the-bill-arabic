import useSWR from "swr";
import ShowExp from "../components/exp/ShowExp";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Exp from "../models/Exp";
import { Btn, Hd, Spans, Title } from "../components/comUtil/ComUtil";
import state from "../stor";
import { Center, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function ShowExpPage({ exp }) {
  const router = useRouter();
  const { data, error } = useSWR("/api/exp", {
    initialData: { exp },
    revalidateOnMount: true,
  });

  if (error)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!data) return <Spans />;

  if (data.exp?.length < 1)
    return (
      <>
        <Title
          title="لم يتم إضافة موظفين إلى الآن ..."
          color={"green.400"}
        ></Title>
        <Center my={["1%", "2%", "3%", "4%"]}>
          <Btn
            fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
            p={["1rem", "1.5rem", "2rem", "2.5rem"]}
            click={() => router.replace(`/addNewExpPage`)}
            title="  إضافة موظف جديد"
            icon={<AddIcon />}
            color={"green.400"}
          ></Btn>
        </Center>
      </>
    );

  return (
    <>
      <Hd title="عرض بيانات الموظفين" />

      <ShowExp exp={exp} />
    </>
  );
}
export const getStaticProps = async () => {
  await dbConnect();
  const data = await Exp.find({});
  if (!data) {
    return {
      redirect: {
        destination: "/",
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
