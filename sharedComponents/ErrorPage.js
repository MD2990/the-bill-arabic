import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function ErrorPage() {
  const router = useRouter();
  const MyText = ({ color, deg, size, text }) => {
    return (
      <Text
        className="hvr hvr-bounce-out"
        isTruncated
        overflow="hidden"
        textOverflow="ellipsis"
        as="span"
        fontSize={`${size}px`}
        fontWeight="bold"
        color={color}
        transform={`rotate(${deg}deg)`}
      >
        {text}
      </Text>
    );
  };
  return (
    <Center mt="10%">
      <VStack justify="center" align="center">
        <HStack
          cursor="pointer"
          spacing="2"
          p="4"
          rounded="2xl"
          onClick={() => router.replace("/")}
        >
          <MyText size="120" color="gray.100" deg="-40" text="S" />
          <MyText size="50" color="gray.200" deg="40" text="O" />
          <MyText size="90" color="gray.300" deg="50" text="M" />
          <MyText size="55" color="gray.400" deg="-50" text="E" />
          <MyText size="70" color="gray.500" deg="60" text="T" />
          <MyText size="95" color="gray.600" deg="-60" text="H" />
          <MyText size="70" color="gray.700" deg="70" text="I" />
          <MyText size="95" color="gray.800" deg="-70" text="N" />
          <MyText size="60" color="gray.900" deg="80" text="G" /> {"   "}
          {"  "}
          <MyText size="90" color="gray.100" deg="-80" text="W" />
          <MyText size="50" color="gray.300" deg="-50" text="E" />
          <MyText size="100" color="gray.500" deg="-50" text="N" />
          <MyText size="85" color="gray.700" deg="30" text="T" /> {"   "}
          {"  "} <MyText size="20" color="gray.200" deg="-10" text="W" />
          <MyText size="19" color="gray.400" deg="-20" text="R" />
          <MyText size="18" color="gray.600" deg="-30" text="O" />
          <MyText size="17" color="gray.800" deg="-40" text="G" />
        </HStack>
        <Image
          width={1500}
          height={600}
          alt="Error"
          src="/imgs/errorPage.svg"
        />
      </VStack>
    </Center>
  );
}
