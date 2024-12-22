import React from "react";
import Head from "next/head";
import { Box, Center } from "@chakra-ui/react";

export function Title({ title, children, color }) {
	return (
		<Center mx="2" userSelect="none" mt={"5%"}>
			<Box
				isTruncated
				fontSize={[20, 25, 35, 50]}
				color={color || "teal.500"}
				fontWeight={"extrabold"}
			>
				{title}
				{children}
			</Box>
		</Center>
	);
}

export function PrintBtn({ click, color }) {
	return (
		<>
			<Button
				variant="ghost"
				size="lg"
				_hover={{
					boxShadow: "none",
					transform: "scale(1.5) ",
					transition: "all 0.2s ease-in-out",
				}}
				_focus={{ boxShadow: "none" }}
				leftIcon={<FcPrint size={"1.8rem"} />}
				onClick={() => click()}
				color={color || "teal.400"}
			>
				طباعة
			</Button>
		</>
	);
}

export function Btn({ click, title, icon, color = "blackAlpha", p, fontSize }) {
	return (
		<Button
			fontSize={fontSize}
			_hover={{
				boxShadow: "none",
				transform: "scale(1.1) ",
				transition: "all 0.2s ease-in-out",
			}}
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

export function Hd({ title }) {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}
