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
import MySkeletons from "../../sharedComponents/MySkeletons";
import { useSnapshot } from "valtio";

export default function ShowSalPage({ sal }) {
  const router = useRouter();

  const { id } = router.query;
  const snap = useSnapshot(state);

  useEffect(() => {
    state.sal = sal.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1));
  }, [sal]);

  if (router.isFallback) {
    return <MySkeletons />;
  }

  if (!sal)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!snap.sal) return <MySkeletons />;

  if (snap.sal.length < 1)
    return (
      <>
        <Stack ml="5%" align={"flex-end"}>
          <BackButton mb="-4%" />
        </Stack>
        <Title title="لا توجد رواتب للموظف  " color={colors().empLight}>
          <Text as="span" color={colors().empLight}>
            {snap.sal[0]?.emp_name || getItem("emp")}
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
      <Hd title={`${snap.sal[0]?.emp_name || getItem("emp")} إضافة راتب للموظف`} />
      <ShowSal  />
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
