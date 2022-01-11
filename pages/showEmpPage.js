import ShowEmp from "../components/emp/ShowEmp";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Emp from "../models/Emp";
import { Btn, Hd, Title } from "../components/comUtil/ComUtil";
import state from "../stor";
import { Center } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { colors } from "../lib/constants";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import MySkeletons from "../sharedComponents/MySkeletons";

export default function ShowEmpPage({ emp }) {
  const router = useRouter();
  const snap = useSnapshot(state);

  useEffect(() => {
    state.emp = emp.sort((a, b) => (a.added_date < b.added_date ? 1 : -1));
  }, [emp]);

  if (!emp)
    return (
      <Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
    );
  if (!snap.emp) return <MySkeletons />;

  if (snap.emp?.length < 1)
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
      <Hd title=" سجل الموظفين" />

      <ShowEmp />
    </>
  );
}
export const getServerSideProps = async () => {
  await dbConnect();
  const data = await Emp.find({});
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const emp = await jsonify(data);

  return {
    props: {
      emp,
    },
  };
};
