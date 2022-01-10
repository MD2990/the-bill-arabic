import ShowSal from "../../components/sal/ShowSal";
import { dbConnect, jsonify } from "../../utils/dbConnect";
import Sal from "../../models/Sal";
import { useRouter } from "next/router";
import { Btn, Hd, Spans, Title } from "../../components/comUtil/ComUtil";
import { Center, Stack, Text } from "@chakra-ui/react";
import state from "../../stor";
import { useEffect } from "react";

import { getItem } from "../../lib/funcs";
import { AddIcon } from "@chakra-ui/icons";
import { BackButton } from "../../sharedComponents/BackButton";
import { colors } from "../../lib/constants";
import useSWR from "swr";

export default function ShowSalPage({ sal }) {
  const router = useRouter();

  const { id } = router.query;

  const { data, error } = useSWR(`/api/sal/${id}`, {
    initialData: { sal },
    revalidateOnMount: true,
  });
  if (router.isFallback) {
    return <Spans />;
  }

  if (error)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!data) return <Spans />;

  if (!data.sal.length)
    return (
      <>
        <Stack ml="5%" align={"flex-end"}>
          <BackButton mb="-4%" />
        </Stack>
        <Title title="لا توجد رواتب للموظف  " color={colors().empLight}>
          <Text as="span" color={colors().empLight}>
            {data.sal[0]?.emp_name}
          </Text>
        </Title>

        <Center my={["1%", "2%", "3%", "4%"]}>
          <Btn
            fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
            p={["1rem", "1.5rem", "2rem", "2.5rem"]}
            click={() => router.replace(`/${id}/addSalaryPage`)}
            title="  إضافة راتب"
            icon={<AddIcon />}
            color={colors().empLight}
          ></Btn>
        </Center>
      </>
    );

  return (
    <>
      <Hd title={`${data.sal[0]?.emp_name} إضافة راتب للموظف`} />
      <ShowSal sal={data.sal} />
    </>
  );
}
// This function gets called at build time
export async function getServerSideProps({ params }) {
  dbConnect();
  const data = await Sal.find({ emp_id: params.id });

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sal = await jsonify(data);

  return {
    props: {
      sal,
    },
  };
}
