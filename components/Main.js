import { Box, Center, Flex, HStack, Separator, Text } from "@chakra-ui/react";
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
			wrap={"wrap"}
			className="main"
			shadow="inner"
			textShadow="0px 0px 15px gray"
			rounded="2xl"
			p="2"
			color={"teal.600"}
		>
			<Box fontSize={["2rem", "4rem", "7rem", "9rem"]}>
				<Link href={path}>
					{React.cloneElement(children)}

					<Text
						fontSize={[10, 15, 20, 25]}
						fontWeight="black"
						textAlign="center"
					>
						{text}
					</Text>
				</Link>
			</Box>
		</HStack>
	);
}

const TheTitle = ({ text }) => (
	<Flex align={"flex-start"}>
		<Text
			textAlign={"right"}
			userSelect={"none"}
			className="rotate"
			p={[2, 3, 4, 5]}
			alignSelf={"center"}
			fontSize={["md", "lg", "3xl", "5xl"]}
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

			<HStack
				wrap={"wrap"}
				pr={[2, 3, 4, 5]}
				justify="right"
				spacing={[4, 6, 8, 12]}
				m={["1%", "2%", "3%", "4%"]}
				shadow="dark-lg"
				rounded="2xl"
			>
				<TheTitle text="الفواتير" />
				<CustomCol path="/addNewBillPage" text={"إضافة فاتورة جديدة"}>
					<FcKindle />
				</CustomCol>{" "}
				<CustomCol path="/showBillPage" text={"عرض الفواتير"}>
					<FcInspection />
				</CustomCol>
				<Separator shadow={"base"} />
				<TheTitle text="المصروفات" />
				<CustomCol path="/addNewExpPage" text={"إضافة مصروفات"}>
					<FcAcceptDatabase />
				</CustomCol>
				<CustomCol path="/showExpPage" text={"عرض المصروفات"}>
					<FcBullish />
				</CustomCol>
				<Separator shadow={"base"} />
				<TheTitle text="الموظفين" />
				<CustomCol path="/addNewEmpPage" text={"إضافة موظف جديد"}>
					<FcBusinessman />
				</CustomCol>
				<CustomCol path="/showEmpPage" text={"عرض بيانات الموظفين"}>
					<FcCollaboration />
				</CustomCol>
				<CustomCol path="/showAllSalPage" text={"عرض جميع الرواتب"}>
					<FcDonate />
				</CustomCol>
			</HStack>
		</>
	);
}
