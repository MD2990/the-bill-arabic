import { Text } from "@chakra-ui/layout";
import React from "react";

export default function TotalText({ text ,color}) {
  return (
    <Text
      fontSize={["md", "lg", "xl", "3xl"]}
      fontWeight="bold"
      fontFamily="Times"
      color={color}
    >
      {text}
    </Text>
  );
}
