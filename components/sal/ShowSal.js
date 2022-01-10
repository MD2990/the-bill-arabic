import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Text, Box, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SalButtons } from "./SalButtons";
import SalCards from "./SalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/constants";

export default function ShowSal({ sal }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.sal = sal.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1));
  }, [ sal]);



  useEffect(() => {
    state.title = "رواتب الموظف";
  }, []);

  return (
    <>
      <VStack>
        <Title title={snap.title} color={colors().salDark}>
          <Text
            fontWeight={"black"}
            color={colors().salLight}
            fontSize={[12, 15, 18, 25]}
            textAlign={"center"}
          >
            {snap.sal[0]?.emp_name || ""}
          </Text>
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
