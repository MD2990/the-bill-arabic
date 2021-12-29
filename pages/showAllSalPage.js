import { dbConnect, jsonify } from "../utils/dbConnect";
import Sal from "../models/Sal";
import { useRouter } from "next/router";
import { Hd, Spans, Title } from "../components/comUtil/ComUtil";
import { Stack } from "@chakra-ui/react";
import { BackButton } from "../sharedComponents/BackButton";
import ShowAllSal from "../components/allSal/ShowAllSal";
import useSWR from "swr";

export default function ShowSalPage({ sal }) {
 

  const router = useRouter();
  const { data, error } = useSWR("/api/sal", {
    initialData: { sal },
    revalidateOnMount: true,
  });

  if (error)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!data) return <Spans />;
 

  if (router.isFallback) {
    return <Spans />;
  }

  if (data.sal?.length < 1)
    return (
      <>
        <Stack ml="5%" align={"flex-end"}>
          <BackButton mb="-4%" />
        </Stack>
        <Title
          title="لم يتم إضافة رواتب إلى الآن ... "
          color={"green.400"}
        ></Title>

   
      </>
    );

  
  return (
    <>
      <Hd title={`عرض جميع الرواتب`} />
      <ShowAllSal
        sal={data.sal}
      />
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
  const sal = await jsonify(data);

  return {
    props: {
      sal,
    },
  };
}
