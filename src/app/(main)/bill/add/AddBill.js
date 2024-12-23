"use client";

import { Center, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BILL_FIELDS from "../const";
import ReusableForm from "@Forms";
import { BILL_validationSchema } from "../../../../../lib/validationSchemas";
import { Title } from "@comUtil/ComUtil";

export default function Add() {
	const initialValues = BILL_FIELDS.reduce((acc, field) => {
		acc[field.name] = field.defaultValue;
		return acc;
	}, {});

	async function handleSubmit(values) {
		try {
			console.log("values", values);
		} catch (error) {
			console.error("error", error);
		}
	}

	return (
		<Center minH={"70vh"} p="2" mb="3rem">
			<VStack p="1" w="full" spacing={[1, 2, 3, 4]}>
				<Title title={"Add Bill"} />
				<ReusableForm
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={BILL_validationSchema}
					fields={BILL_FIELDS}
					colSpan={1}
					textAreaColSpan={1}
				/>
			</VStack>
		</Center>
	);
}
