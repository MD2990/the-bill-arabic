import React from "react";
import { Box, Center } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { CalendarIcon } from "@chakra-ui/icons";

export function Title({ title, children, color }) {
  
  return (
    <Center  mx="2" userSelect="none" mt={"5%"}>
      <Box
        isTruncated
        fontSize={[20, 25, 35, 50]}
        color={ color || "teal.500"}
        fontWeight={"extrabold"}
      >
        {title}
        {children}
      </Box>
    </Center>
  );
}

export function PrintBtn({ click }) {
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        _hover={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        leftIcon={<CalendarIcon />}
        onClick={() => click()}
        colorScheme="whatsapp"
      >
        طباعة
      </Button>
    </>
  );
}

export function Btn({ click, title, icon, color = "blackAlpha" ,p,fontSize }) {
  return (
    <Button
     fontSize={fontSize}
      _hover={{ boxShadow: "none", transform: "scale(1.1) ", transition: "all 0.2s ease-in-out" }}
      _focus={{ boxShadow: "none" }}
      color={color}
      leftIcon={icon}
      size="lg"
      colorScheme="gray"
      variant="outline"
      onClick={() => click()}
      p={p}
    >
      {title}
    </Button>
  );
}

export function Spans() {
  return (
    <Center mt={200}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Center>
  );
}

export function Hd({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
