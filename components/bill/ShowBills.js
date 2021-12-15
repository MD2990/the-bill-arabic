import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BillButtons } from "./BillButtons";
import BillCards from "./BillCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";

export default function ShowBills() {
  

  return (
    <>
      <Title title="الفواتير" />

      <MainInterface>
        <BillButtons />

        <Divider mt="-8" />

        <BillCards />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
