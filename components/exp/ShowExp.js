import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ExpButtons } from "./ExpButtons";
import ExpCards from "./ExpCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import { useSnapshot } from "valtio";
import state from "../../stor";
import { colors } from "../../lib/constants";

export default function ShowExp() {
  const snap = useSnapshot(state);




  useEffect(() => {
    state.title = "المصروفات";
  }, []);

  return (
    <>
      <Title title={snap.title} color={colors.expDark} />

      <MainInterface>
        <ExpButtons />

        <Divider mt="-8" />

        <ExpCards />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
