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

  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  const editFunction = (_id) => {
    router.push(`/${_id}/salEdit`);
  };

  const deleteFunction = async (_id) => {
    await handleFormDelete({
      deleteUrl: "sal",
      id: _id,

      handleDelete,

      secondDelete: () =>
        (state.allSal = snap.allSal.filter((item) => item._id !== _id)),
    });
  };

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
          <MyTable
            data={rs}
            tableTitle="بيانات الرواتب لجميع الموظفين"
            editFunction={editFunction}
            deleteFunction={deleteFunction}
          />
        )}
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
