"use client";

import { Center, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import BILL_FIELDS from "../const";
import ReusableForm from "@Forms";
import { BILL_validationSchema } from "../../../../../lib/validationSchemas";
import { Title } from "@comUtil/ComUtil";

export default function Add() {
	const { reset } = useForm();

	async function add(values) {
		try {
			console.log("values", values);
		} catch {
			console.log("error");
		}
	}

	const AddBillForm = ({ add }) => {
		const onSubmit = async (values) => {
			try {
				console.log("values", values);

				reset();
			} catch {
				console.log("error");
			}
		};

		const initialValues = BILL_FIELDS.reduce((acc, field) => {
			acc[field.name] = field.defaultValue;
			return acc;
		}, {});

		return (
			<ReusableForm
				validationType="zod"
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={BILL_validationSchema}
				fields={BILL_FIELDS}
				colSpan={1}
				textAreaColSpan={1}
			/>
		);
	};

	return (
		<Center minH={"70vh"} p="2" mb="3rem">
			<VStack p="1" w="full" spacing={[1, 2, 3, 4]}>
				<Title title={"Add Bill"} />
				<AddBillForm add={add} />
			</VStack>
		</Center>
	);
}
