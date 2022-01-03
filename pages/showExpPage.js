import useSWR from "swr";
import ShowExp from "../components/exp/ShowExp";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Exp from "../models/Exp";
import { Btn, Hd, Spans, Title } from "../components/comUtil/ComUtil";
import { Center } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { colors } from "../lib/constants";

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
        <Hd title=" المصروفات" />

        <Title
          title="لم يتم إضافة مصروفات إلى الآن ..."
          color={colors().expLight}
        ></Title>
        <Center my={["1%", "2%", "3%", "4%"]}>
          <Btn
            fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
            p={["1rem", "1.5rem", "2rem", "2.5rem"]}
            click={() => router.replace(`/addNewExpPage`)}
            title="  إضافة مصروف جديد"
            icon={<AddIcon />}
            color={colors().expLight}
          ></Btn>
        </Center>
      </>
    );

  return (
    <>
      <Hd title=" المصروفات" />

      <ShowExp exp={data.exp} />
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
