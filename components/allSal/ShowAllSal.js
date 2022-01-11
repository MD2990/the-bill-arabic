import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SalButtons } from "./allSalButtons";
import AllSalCards from "./allSalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { snapshot, useSnapshot } from "valtio";
import { today } from "../../lib/funcs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../../lib/constants";


export default function ShowAllSal({ sal }) {
 
  const snap= useSnapshot(state);



  useEffect(() => {
    state.title = " جميع الرواتب";
  }, [sal]);  

  return (
    <>
      <Title title={snap.title} color={ colors().salDark }></Title>

      <MainInterface>
        <SalButtons />

        <Divider mt="-8" />

        <AllSalCards />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
