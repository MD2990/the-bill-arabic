import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../stor";

import { Input } from "@chakra-ui/input";
import { myFilter } from "../lib/funcs";



export function SearchInputField({ theValue, onChange }) {
  return (
    <Input
      focusBorderColor="gray.400"
      mx="8"
      my="4"
      fontSize={["sm", "md", "lg", "xl"]}
      textAlign="center"
      size="lg"
      rounded="full"
      placeholder="Search by any field"
      value={theValue}
      onChange={onChange}
    />
  );
}

export default function SearchInput({ data }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.searchResults = myFilter({
      arr: data,
      searchTerm: state.searchTerm,
    });
  }, [data, snap.searchTerm]);

  const handleChange = (e) => {
    state.searchTerm = e.target.value;
  };

  return (
    <>
      <SearchInputField theValue={snap.searchTerm} onChange={handleChange} />
    </>
  );
}
