import useSWR from "swr";
import ShowSal from "../../components/sal/ShowSal";
import { dbConnect, jsonify } from "../../utils/dbConnect";
import Sal from "../../models/Sal";
import { useRouter } from "next/router";
import { Hd, Spans } from "../../components/comUtil/ComUtil";
import { Button, Center } from "@chakra-ui/react";
import state from "../../stor";
import { useEffect } from "react";

export default function ShowSalPage({ sal }) {


	  useEffect(
      () => (state.sal = sal),

      [sal]
    );
 
  const router = useRouter();
  if (router.isFallback) {
    return <Spans />;
  }
  const { id } = router.query;

  if (sal?.length < 1)
    return (
      <Center>
        <Button
          variant="outline"
          colorScheme="teal"
          size="lg"
          fontSize="5xl"
          padding="10"
          margin="32"
          onClick={() => router.replace(`/${id}/empAddSal`)}
        >
          إضافة راتب
        </Button>
      </Center>
    );
	

  return (
    <>
      <Hd title={`إضافة راتب للموظف`} />
      <ShowSal />
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
