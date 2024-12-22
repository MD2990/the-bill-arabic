import { dbConnect, jsonify } from "../utils/dbConnect";
import Sal from "../models/Sal";
import { useRouter } from "next/router";
import { Hd, Title } from "../components/comUtil/ComUtil";
import { Stack } from "@chakra-ui/react";
import { BackButton } from "../sharedComponents/BackButton";
import ShowAllSal from "../components/allSal/ShowAllSal";
import { colors } from "../lib/constants";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../stor";
import MySkeletons from "../sharedComponents/MySkeletons";

export default function ShowSalPage({ allSal }) {
  const snap = useSnapshot(state);
  const router = useRouter();

  useEffect(() => {
    state.allSal = allSal.sort((a, b) =>
      a.salary_date > b.salary_date ? -1 : 1
    );
  }, [allSal]);

  if (!allSal)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!snap.allSal) return <MySkeletons />;

  if (router.isFallback) {
    return <MySkeletons />;
  }

  if (snap.allSal?.length < 1)
    return (
      <>
        <Stack ml="5%" align={"flex-end"}>
          <BackButton mb="-4%" />
        </Stack>
        <Hd title={` جميع الرواتب`} />

        <Title
          title="لم يتم إضافة رواتب إلى الآن ... "
          color={colors.salLight}
        ></Title>
      </>
    );

  return (
    <>
      <Hd title={`عرض جميع الرواتب`} />
      <ShowAllSal sal={allSal} />
    </>
  );
}
// This function gets called at build time
export async function getStaticProps() {
  dbConnect();
  const data = await Sal.find({});

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const allSal = await jsonify(data);

  return {
    props: {
      allSal,
    },
    revalidate: 1,
  };
}
