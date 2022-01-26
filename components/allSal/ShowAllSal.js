import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Wrap, WrapItem, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SalButtons } from "./allSalButtons";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/constants";

import { useRouter } from "next/router";
import { handleFormDelete, setItem } from "../../lib/funcs";
import { handleDelete } from "../../utils/dbConnect";
import { MyTable } from "../../sharedComponents/MyTable";
import AllSalTable from "./AllSalTable";

export default function ShowAllSal({ sal }) {
  const router = useRouter();
  const snap = useSnapshot(state);
  useEffect(() => {
    state.title = " جميع الرواتب";
    state.subTitle = snap.searchTerm
      ? ` للموظف ${snap.searchTerm.toUpperCase()}`
      : "";
    state.isMonthFilter = false;
  }, [snap.searchTerm]);


  return (
    <>
      <Title title={snap.title} color={colors.salDark}>
        {snap.isMonthFilter && (
          <Text as="span" color="blue.300">
            {snap.subTitle}
          </Text>
        )}
      </Title>

      <MainInterface>
        <SalButtons sal={sal} />

        <Divider mt="-8" />
        {snap.searchResults.length > 0 && (
    <AllSalTable/>
        )}
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
