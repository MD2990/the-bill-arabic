import Link from "next/link";
import {
  FcBusinessman,
  FcCollaboration,
  FcDonate,
  FcInspection,
  FcBullish,
  FcAcceptDatabase,
  FcKindle,
} from "react-icons/fc";

import {
  Center,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

export function CustomCol({ path, children, text, size = "8em" }) {
  return (
    <WrapItem shadow="inner" textShadow="0px 0px 15px gray" rounded="2xl" p="2">
      <Link href={path}>
        <a className="text-center">
          {React.cloneElement(children, { size })}
          <Text
            fontWeight="black"
            fontSize={[10, 15, 20, 25]}
            textAlign="center"
          >
            {text}
          </Text>
        </a>
      </Link>
    </WrapItem>
  );
}

export default function Main() {
  return (
    <>
      <Center p="4" m="4">
        <Text
          border="1px"
          borderRadius="40"
          p="4"
          fontSize={["md", "lg", "3xl", "5xl"]}
          textAlign="center"
          fontWeight="extrabold"
          color="teal.200"
        >
          مشاركة الأصول الإنسانية
        </Text>
      </Center>
      <Wrap
        justify="center"
        spacing={[4, 6, 8, 12]}
        mx="2%"
        my="3%"
        shadow="dark-lg"
        rounded="2xl"

    
      >

        <CustomCol path="/addNewBillPage" text={"إضافة فاتورة جديدة"}>
          <FcKindle />
        </CustomCol>
        <CustomCol path="/showBillPage" text={"عرض الفواتير"}>
          <FcInspection />
        </CustomCol>

        <CustomCol path="/showSellPage" text={"عرض الدخل اليومي"}>
          <FcBullish />
        </CustomCol>

        <CustomCol path="/addNewSellPage" text={"إضافة الدخل اليومي"}>
          <FcAcceptDatabase />
        </CustomCol>

        <CustomCol path="/showAllSal" text={"عرض جميع الرواتب"}>
          <FcDonate />
        </CustomCol>

        <CustomCol path="/emp" text={"عرض بيانات الموظفين"}>
          <FcCollaboration />
        </CustomCol>

        <CustomCol path="/empAdd" text={"إضافة موظف جديد"}>
          <FcBusinessman />
        </CustomCol>
      </Wrap>
    </>
  );
}
