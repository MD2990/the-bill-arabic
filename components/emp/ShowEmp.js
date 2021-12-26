import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { EmpButtons } from "./EmpButtons";
import EmpCards from "./EmpCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";

export default function ShowBills() {
  

  return (
    <>
      <Title title="سجل الموظفين" />

      <MainInterface>
        <EmpButtons />

        <Divider mt="-8" />

        <EmpCards />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
