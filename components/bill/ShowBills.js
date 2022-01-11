import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BillButtons } from "./BillButtons";
import BillCards from "./BillCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import { useSnapshot } from "valtio";
import state from "../../stor";
import { colors } from "../../lib/constants";

export default function ShowBills() {

  const snap = useSnapshot(state);


    useEffect(() => {
      state.title = " الفواتير";
    }, []);

  return (
    <>
      <Title title={snap.title} color={colors.billLight} />

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
