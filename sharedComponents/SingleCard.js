import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Heading,
  Text,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import { setItem } from "../lib/funcs";
export const AllText = ({ color = " blackAlpha.50", title, data }) => (
  <Text pb="0.5" color={color} fontSize={["xs", "sm", "md", "lg"]}>
    <Text pl="2" as="span" fontWeight="black" color="blackAlpha.800">
      {title}
    </Text>
    {data}
  </Text>
);

export default function SingleCard({
  addSalary = false,
  deleteFunction,
  showSalary = false,
  deleteObject = true,
  link,
  children,
  _id,
  header,
}) {
  const router = useRouter();

  return (
    <WrapItem
      alignItems="center"
      whiteSpace="nowrap"
      background="blackAlpha.200"
      boxShadow="dark-lg"
      rounded="2xl"
    >
      <Center m={[1, 1.5, 2]} p={[1, 1.5, 2]} cursor="pointer" mr="-1">
        <HStack spacing="2">
          <Tooltip
            label="Edit"
            color="black"
            placement="bottom-start"
            hasArrow
            bg="gray.100"
          >
            <Text as="span">
              <AiOutlineEdit
                color="gray"
                size="1.5rem"
                onClick={() => router.push(link)}
              />
            </Text>
          </Tooltip>

          {addSalary && (
            <Tooltip
              label="Add Salary"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="Search database"
                icon={<AddIcon />}
                color="green.300"
                size="1.5rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);

                  router.push(`/${_id}/AddSalary`);
                }}
              />
            </Tooltip>
          )}
          {showSalary && (
            <Tooltip
              label="Show Salaries"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="Show Salaries"
                icon={<ViewIcon />}
                color="blue.300"
                size="1.5rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);
                  router.push(`/${_id}/ShowEmpSalPage`);
                }}
              />
            </Tooltip>
          )}

          {deleteObject && (
            <Tooltip
              label="Delete"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="Search database"
                icon={<DeleteIcon />}
                color="red.300"
                size="1.5rem"
                onClick={deleteFunction}
              />
            </Tooltip>
          )}
        </HStack>
      </Center>
      <Accordion defaultIndex={[1]} allowMultiple="false" rounded="lg">
        <AccordionItem border="none">
          <Heading>
            <AccordionButton
              _hover={{ boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
            >
              <Box flex="1" textAlign="right">
                <Text
                  p="4"
                  textAlign="right"
                  fontSize="xl"
                  color="blackAlpha.800"
                  fontWeight="bold"
                >
                  {header}
                </Text>
              </Box>
              <AccordionIcon color={"turquoise"} fontSize="3xl" />
            </AccordionButton>
          </Heading>

          <AccordionPanel pb={4}>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </WrapItem>
  );
}
