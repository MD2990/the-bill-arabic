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
import { FaMoneyBillWave } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { setItem } from "../lib/funcs";
export const AllText = ({ color , title, data }) => (
  <Text pb="0.5" color={color} fontSize={["xs", "sm", "md", "lg"]}>
    <Text pl="2" as="span" fontWeight="black" >
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
  color,
  HD_color,
}) {
  const router = useRouter();

  return (
    <WrapItem
      alignItems="center"
      whiteSpace="nowrap"
      boxShadow="dark-lg"
      rounded="xl"
      bg={color}
    >
      <Center m={[1, 1.5, 2]} p={[1, 1.5, 2]} cursor="pointer" mr="-1">
        <HStack spacing={[1, 2, 3]} align={"flex-end"}>
          <Tooltip
            label="تعديل"
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
              label="إضافة راتب"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="Add Salary"
                icon={<AddIcon />}
                color="green.500"
                size="1.5rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);

                  router.push(`/${_id}/addSalaryPage`);
                }}
              />
            </Tooltip>
          )}
          {showSalary && (
            <Tooltip
              label="عرض الرواتب"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="Show Salaries"
                icon={<FaMoneyBillWave />}
                color="blue.400"
                size="1.8rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);
                  router.push(`/${_id}/showSalPage`);
                }}
              />
            </Tooltip>
          )}

          {deleteObject && (
            <Tooltip
              label="حذف"
              color="black"
              placement="bottom-start"
              hasArrow
              bg="gray.100"
            >
              <IconButton
                variant="unstyled"
                aria-label="DELETE"
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
                  isTruncated
                  p={[0.5, 1, 1.5,2]}
                  textAlign="right"
                  fontSize={["sm", "md", "lg", "xl"]}
                  color={HD_color}
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
