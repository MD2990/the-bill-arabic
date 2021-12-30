import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Text, Box, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SalButtons } from "./SalButtons";
import SalCards from "./SalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { getItem } from "../../lib/funcs";
import { useSnapshot } from "valtio";

export default function ShowSal() {
  const snap = useSnapshot(state);
/*   useEffect(() => {
    state.title = snap.isFiltered
      ? `جميع الرواتب    ${getItem("emp")}`
      : "جميع الرواتب";
  }, [snap.isFiltered]); */
  return (
    <>
      <VStack>

        <Text fontWeight={"black"} color={"blue.300"} fontSize={[12,15,18,25]} >
          {getItem("emp")}
        </Text>
      <Title title={snap.title} color={"blue.500"}>
      </Title>
      </VStack>

      <MainInterface>
        <SalButtons />

        <Divider mt="-8" />

        <SalCards />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
