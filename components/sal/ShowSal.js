import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Text, Box } from "@chakra-ui/react";
import React from "react";
import { SalButtons } from "./SalButtons";
import SalCards from "./SalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { getItem } from "../../lib/funcs";

export default function ShowSal() {
  return (
    <>
      <Title title="رواتب الموظف: ">
        <Text  fontWeight={"hairline"} color={"teal.200"} as="span">
          {getItem("emp")}
        </Text>
      </Title>

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
