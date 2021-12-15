import { Box, Wrap } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import React from "react";

export default function MySkeletons() {
  const colors = { startColor: "gray.50", endColor: "gray.300" };
  const Skeletons = () => (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="2xl">
      <Skeleton
        height="20px"
        {...colors}
        borderRadius="2xl"
        mb="7"
        mt="2"
        h="8"
      />
      <SkeletonCircle size="12" {...colors} w="44" ml="8" />
      <SkeletonText
        {...colors}
        mt="4"
        noOfLines={6}
        spacing="6"
        h="15rem"
        w="15rem"
      />
    </Box>
  );
  return (
    <Wrap
      justify="center"
      textAlign="center"
      spacing="9"
      mt="10rem"
      ml="auto"
      mr="auto"
    >
      <Skeletons />
      <Skeletons />
      <Skeletons />
    </Wrap>
  );
}
