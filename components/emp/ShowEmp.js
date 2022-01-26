import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { EmpButtons } from "./EmpButtons";
import EmpTable from "./EmpCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { colors } from "../../lib/constants";
import { useSnapshot } from "valtio";

export default function ShowEmp() {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.title = "سجل الموظفين";
       state.searchTerm = "";
  }, []);

  return (
    <>
      <Title title={snap.title} color={colors.empLight} />

      <MainInterface>
        <EmpButtons />

        <Divider mt="-8" />

        <EmpTable />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
