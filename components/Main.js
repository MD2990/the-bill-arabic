import {
	Box,
	Center,
	Flex,
	HStack,
	Separator,
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
		<Box
			fontSize={["2rem", "4rem", "7rem", "9rem"]}
			className="main"
			shadow="inner"
			textShadow="0px 0px 15px gray"
			rounded="2xl"
			p="2"
			color={"teal.600"}
		>
			<Link href={path}>
				{React.cloneElement(children)}

				<Text fontSize={[7, 10, 15, 20]} fontWeight="black" textAlign="center">
					{text}
				</Text>
			</Link>
		</Box>
	);
}

const TheTitle = ({ text }) => (
	<Flex align={"flex-start"}>
		<Text
			textAlign={"right"}
			userSelect={"none"}
			className="rotate"
			p={[2, 3, 4]}
			alignSelf={"center"}
			fontSize={["sm", "md", "lg", "xl"]}
			fontWeight="extrabold"
			color={["teal.300"]}
		>
			{text}{" "}
		</Text>
	</Flex>
);

export default function Main() {
	return (
		<>
			<Center p="4" m="4">
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

			<Flex
				wrap="nowrap"
				pr={[2, 3, 4, 5]}
				justify="space-around"
				m={2}
				shadow="lg"
				rounded="2xl"
			>
				<VStack p="1" borderRight={"solid 1px lightGray"} w="full">
					<TheTitle text="الفواتير" />
					<HStack p="2" justify={"center"}>
						<CustomCol path="/addNewBillPage" text={"إضافة فاتورة"}>
							<FcKindle />
						</CustomCol>
						<CustomCol path="/showBillPage" text={"عرض الفواتير"}>
							<FcInspection />
						</CustomCol>
					</HStack>
				</VStack>
				<VStack p="1" borderRight={"solid 1px lightGray"} w="full">
					<TheTitle text="المصروفات" />
					<HStack p="2" justify="center" w="full">
						<CustomCol path="/addNewExpPage" text={"إضافة مصروفات"}>
							<FcAcceptDatabase />
						</CustomCol>
						<CustomCol path="/showExpPage" text={"عرض المصروفات"}>
							<FcBullish />
						</CustomCol>
					</HStack>
				</VStack>
				<VStack p="1" w="full">
					<TheTitle text="الموظفين" />
					<HStack p="2" justify="center">
						<CustomCol path="/addNewEmpPage" text={"إضافة موظف"}>
							<FcBusinessman />
						</CustomCol>
						<CustomCol path="/showEmpPage" text={"بيانات الموظفين"}>
							<FcCollaboration />
						</CustomCol>
						<CustomCol path="/showAllSalPage" text={"عرض الرواتب"}>
							<FcDonate />
						</CustomCol>
					</HStack>
				</VStack>
			</Flex>
		</>
	);
}
