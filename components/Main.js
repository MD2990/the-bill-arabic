import {
	Box,
	Center,
	Flex,
	HStack,
	Separator,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
	FcBusinessman,
	FcCollaboration,
	FcDonate,
	FcInspection,
	FcBullish,
	FcAcceptDatabase,
	FcKindle,
} from "react-icons/fc";

function CustomCol({ path, children, text }) {
	return (
		<HStack
			fontSize={["2rem", "4rem", "5rem"]}
			textShadow="0px 0px 15px gray"
			rounded="2xl"
			p="2"
			color={"teal.600"}
			w="full"
			border={"solid 1px lightGray"}
			justify={"center"}
			bg="gray.100"
			_hover={{
				bg: "teal.100",
				color: "teal.800",
				border: "solid 1px teal",
			}}
		>
			<Link href={path}>
				<Text fontSize={[10, 15, 20]} fontWeight="black" textAlign="center">
					{text}
				</Text>
				{children}
			</Link>
		</HStack>
	);
}

const TheTitle = ({ text }) => (
	<Text
		textAlign={"center"}
		userSelect={"none"}
		className="rotate"
		p={1}
		alignSelf={"center"}
		fontSize={["sm", "md", "lg", "xl", "2xl"]}
		fontWeight="extrabold"
		color={["teal.300"]}
	>
		{text}{" "}
	</Text>
);

export default function Main() {
	return (
		<>
			<Center minH={"25lvh"}>
				<Text
					className="blob"
					userSelect={"none"}
					borderRadius="40"
					p={[1, 2, 3]}
					fontSize={["md", "lg", "3xl", "5xl"]}
					textAlign="center"
					fontWeight="extrabold"
					color={["teal.200", "teal.300", "teal.400", "teal.500"]}
				>
					مشاريع الأنهار المتكاملة
				</Text>
			</Center>

			<SimpleGrid gap="40px" minChildWidth="md" dir="rtl" mb="4" mx="2">
				<Stack p="2" justify={"center"} w="full">
					<TheTitle text="الفواتير" />
					<CustomCol path="/bill/add" text={"إضافة فاتورة"}>
						<FcKindle />
					</CustomCol>
					<CustomCol path="/showBillPage" text={"عرض الفواتير"}>
						<FcInspection />
					</CustomCol>
				</Stack>
				<Stack p="2" justify={"center"} w="full">
					<TheTitle text="المصروفات" />
					<CustomCol path="/addNewExpPage" text={"إضافة مصروفات"}>
						<FcAcceptDatabase />
					</CustomCol>
					<CustomCol path="/showExpPage" text={"عرض المصروفات"}>
						<FcBullish />
					</CustomCol>
				</Stack>
				<Stack p="1" w="full">
					<TheTitle text="الموظفين" />
					<CustomCol path="/addNewEmpPage" text={"إضافة موظف"}>
						<FcBusinessman />
					</CustomCol>
					<CustomCol path="/showEmpPage" text={"بيانات الموظفين"}>
						<FcCollaboration />
					</CustomCol>
					<CustomCol path="/showAllSalPage" text={"عرض الرواتب"}>
						<FcDonate />
					</CustomCol>
				</Stack>
			</SimpleGrid>
		</>
	);
}
