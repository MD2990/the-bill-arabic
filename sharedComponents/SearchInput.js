import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../stor";
import { Input } from "@chakra-ui/input";
import { myFilter } from "../lib/funcs";

 function SearchInputField() {
  const snap = useSnapshot(state);
  const handleChange = (e) => {
    state.searchTerm = e.target.value;
  };
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
      value={snap.searchTerm}
      onChange={handleChange}
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
    state.isMonthFilter = false;

  }, [data, snap.searchTerm]);

  return (
    <>
      <SearchInputField />
    </>
  );
}
