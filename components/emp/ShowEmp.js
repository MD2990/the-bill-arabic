import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { EmpButtons } from "./EmpButtons";
import EmpCards from "./EmpCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { colors } from "../../lib/constants";

export default function ShowBills({ emp }) {
  useEffect(() => {
    state.emp = emp.sort((a, b) => (a.added_date < b.added_date ? 1 : -1));
  }, [emp]);

  return (
    <>
      <Title title="سجل الموظفين" color={colors().empLight} />

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
