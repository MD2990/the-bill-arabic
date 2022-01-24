import { Box, Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { Title } from "../comUtil/ComUtil";
import MySkeletons from "../../sharedComponents/MySkeletons";
import { handleDelete } from "../../utils/dbConnect";

import state from "../../stor";
import SingleCard, { AllText } from "../../sharedComponents/SingleCard";
import {   getItem, handleFormDelete, reverseString, setItem } from "../../lib/funcs";
import { MyTable } from "../../sharedComponents/MyTable";
import { useRouter } from "next/router";

export default function SalCards() {
  const snap = useSnapshot(state);
const router= useRouter();

  
  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);


  if (!snap.sal) return <MySkeletons />;
  
  const editFunction = ( _id ) => {
    
    router.push(`/${_id}/salEdit`);
  };

  const deleteFunction = async (_id) => {
    await handleFormDelete({
      deleteUrl: "sal",
      id: _id,

      handleDelete,

      secondDelete: () =>
        (state.sal = state.sal.filter((item) => item._id !== _id)),
    });
  };

  
  return (
    <MyTable
      data={rs}
      tableTitle={ snap.sal.emp_name}
      editFunction={editFunction}
      deleteFunction={deleteFunction}
    />
  
  );
}
