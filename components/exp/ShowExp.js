import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ExpButtons } from "./ExpButtons";
import ExpCards from "./ExpCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import { useSnapshot } from "valtio";
import state from "../../stor";

export default function ShowExp({exp}) {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.exp = exp.sort((a, b) => (a.added_date < b.added_date ? 1 : -1));
  }, [exp]);
  useEffect(() => {
    state.title = "المصروفات";
  }, []);

  return (

    <>
    
      <Title title={snap.title}  color={'gray.500'} />

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
