import React from "react";
import { Title } from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	CustomField,
	CustomFieldWithValue,
	CustomTextArea,
	FormBottomButton,
} from "../../comUtil/ComUtil";
import {
	colors,
	EMP_validationSchema,
	SAL_validationSchema,
} from "../../lib/validationSchemas";
import { handlePut, handleDelete, getSumToNum } from "../../utils/dbConnect";
import { cutString, getItem, handleFormDelete } from "../../lib/funcs";

export default function Edit_Delete_Sal({ sal }) {
	const router = useRouter();

	const {
		basic_salary,
		emp_name,
		bonus,
		loans,
		total_salary,
		emp_id,
		salary_date,
		remarks,
		_id,
	} = sal;

	const id = cutString(_id);
	async function put(values) {
		handlePut({ values, url: "sal", router });
		router.back();
	}

	async function FormDeleteFunc() {
		await handleFormDelete({
			deleteUrl: "sal",
			id: _id,
			handleDelete,
			router,
		});
	}
	return (
		<Formik
			initialValues={{
				id,
				basic_salary,
				bonus,
				loans,
				total_salary,
				emp_id,
				salary_date,
				remarks,
			}}
			onSubmit={async (values, actions) => {
				await put(values);
				actions.setSubmitting(false);
			}}
			validationSchema={SAL_validationSchema}
		>
			{(props) => {
				return (
					<Form>
						<Title title={`تحديث راتب الموظف:   `} color={colors.salDark}>
							<Text as="span" color={colors.salLight}>
								{" "}
								{emp_name?.toUpperCase()}{" "}
							</Text>
						</Title>
						<Center m="2" p="2">
							<Wrap
								justify="center"
								borderWidth="1px"
								borderRadius="lg"
								p="8"
								color={colors.salLight}
							>
								<CustomField
									fieldName="basic_salary"
									labelName="الراتب الأساسي"
									type="number"
								/>
								<CustomField
									fieldName="bonus"
									labelName="العلاوات"
									type="number"
								/>
								<CustomField
									fieldName="loans"
									labelName="القروض"
									type="number"
								/>
								<CustomFieldWithValue
									forSalary
									fieldName="total_salary"
									labelName="الراتب الإجمالي"
									values={getSumToNum(
										props.values.basic_salary,
										props.values.bonus,
										props.values.loans
									)}
								/>
								<CustomField
									fieldName="salary_date"
									labelName="تاريخ الراتب"
									type="date"
								/>

								<CustomTextArea fieldName="remarks" labelName="ملاحظات" />

								<CustomField
									fieldName="id"
									labelName="الرمز التعريفي"
									disabled
								/>
								<Divider />

								<FormBottomButton
									router={router}
									props={props}
									deleteBtn
									onDelete={FormDeleteFunc}
								/>
							</Wrap>
						</Center>
					</Form>
				);
			}}
		</Formik>
	);
}
