import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Text, Box, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SalButtons } from "./SalButtons";
import SalCards from "./SalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/validationSchemas";
import { getItem } from "../../lib/funcs";

export default function ShowSal() {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.title = "رواتب الموظف";
	}, []);

	return (
		<>
			<VStack>
				<Title title={snap.title} color={colors.salDark}>
					<Text
						fontWeight={"black"}
						color={colors.salLight}
						fontSize={[12, 15, 18, 25]}
						textAlign={"center"}
					>
						{snap.sal[0]?.emp_name || getItem("emp")}
					</Text>
				</Title>
			</VStack>

			<MainInterface>
				<SalButtons />

				<Divider mt="-8" />

				<SalCards />
			</MainInterface>
			<HStack mt="12" justify="center">
				<Paginate />
			</HStack>
		</>
	);
}
