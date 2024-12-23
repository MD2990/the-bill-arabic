import React, { useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Wrap,
	WrapItem,
	IconButton,
} from "@chakra-ui/react";
import state from "../stor";
import { FaMoneyBillWave } from "react-icons/fa";
import { useSnapshot } from "valtio";
import { handleFormDelete, setItem } from "../lib/funcs";
import { handleDelete } from "../utils/dbConnect";
import { useRouter } from "next/router";
import { colors } from "../lib/validationSchemas";

export function MyTable({ data, tableTitle, emp, allSal, sal }) {
	const router = useRouter();
	const [arrowIcon, setArrowIcon] = useState("");
	const [dec, setDec] = useState(false);
	const ArrowIcon = dec ? "▼" : "▲";
	const snap = useSnapshot(state);
	const sortArray = ({ array, key, isTrue }) => {
		return array.sort((a, b) => {
			key = key.toLowerCase().trim();

			setArrowIcon(key);
			if (isTrue) return a[key] < b[key] ? -1 : 1;
			return a[key] > b[key] ? -1 : 1;
		});
	};

	const salaryCount = ({ arr, _id, key }) =>
		arr.filter((e) => e[key] === _id).length;

	const EmpTable = () => (
		<>
			<Thead>
				<Tr>
					<Th
						cursor={"pointer"}
						onClick={() => {
							setDec(!dec);

							sortArray({
								array: state.searchResults,
								key: "emp_name",
								isTrue: dec,
							});
						}}
					>
						الإسم {arrowIcon === "emp_name" ? ArrowIcon : ""}
					</Th>

					<Th>الوظيفة</Th>
					<Th>رقم البطاقة </Th>
					<Th> رقم الجواز </Th>
					<Th>تاريخ الإضافة</Th>

					<Th
						cursor={"pointer"}
						onClick={() => {
							setDec(!dec);

							sortArray({
								array: state.searchResults,
								key: "empl_date",
								isTrue: dec,
							});
						}}
					>
						تاريخ التوظيف
						{arrowIcon === "empl_date" ? ArrowIcon : ""}
					</Th>

					<Th>الرواتب</Th>
					<Th>حذف</Th>
					<Th>عرض الرواتب</Th>
					<Th>إضافة راتب</Th>
				</Tr>
			</Thead>
			<Tbody>
				{data().map(
					({
						_id,
						emp_name,
						empl_date,
						job,
						civil_id,
						passport_number,
						added_date,
					}) => {
						const deleteFunction = async () => {
							await handleFormDelete({
								deleteUrl: "emp",
								id: _id,

								handleDelete,

								secondDelete: () =>
									(state.emp = snap.emp.filter((item) => item._id !== _id)),
							});
						};
						return (
							<Tr key={_id}>
								<Td
									cursor={"pointer"}
									_hover={{ color: "red", textDecoration: "underline" }}
									onClick={() => router.push(`/${_id}/empEdit`)}
								>
									{emp_name}
								</Td>

								<Td>{job}</Td>
								<Td>{civil_id}</Td>
								<Td>{passport_number}</Td>
								<Td>{added_date}</Td>
								<Td>{empl_date}</Td>
								<Td>{salaryCount({ arr: snap.sal, _id, key: "emp_id" })}</Td>
								<Td onClick={deleteFunction} cursor={"pointer"}>
									<DeleteIcon color={"red.300"} />
								</Td>
								<Td>
									<IconButton
										variant="unstyled"
										aria-label="Show Salaries"
										icon={<FaMoneyBillWave />}
										color={`${colors.empDark.substring(
											colors.empDark.length - 4,
											0
										)}`}
										size="1.8rem"
										onClick={() => {
											router.push(`/${_id}/showSalPage`);
											setItem("emp", emp_name);
										}}
									/>
								</Td>
								<Td>
									<IconButton
										variant="unstyled"
										aria-label="Add Salary"
										icon={<AddIcon />}
										color={`${colors.empDark.substring(
											colors.empDark.length - 4,
											0
										)}`}
										size="1.5rem"
										onClick={() => {
											router.push(`/${_id}/addSalaryPage`);
											setItem("emp", emp_name);
										}}
									/>
								</Td>
							</Tr>
						);
					}
				)}
			</Tbody>
		</>
	);

	const AllSalTable = () => (
		<>
			<Thead>
				<Tr>
					<Th
						cursor={"pointer"}
						onClick={() => {
							setDec(!dec);

							sortArray({
								array: state.searchResults,
								key: "emp_name",
								isTrue: dec,
							});
						}}
					>
						الإسم {arrowIcon === "emp_name" ? ArrowIcon : ""}
					</Th>

					<Th
						cursor={"pointer"}
						onClick={() => {
							setDec(!dec);

							sortArray({
								array: state.searchResults,
								key: "salary_date",
								isTrue: dec,
							});
						}}
					>
						تاريخ الإستلام
						{arrowIcon === "salary_date" ? ArrowIcon : ""}
					</Th>

					<Th>تعديل</Th>
					<Th>حذف</Th>
					<Th>عرض </Th>
					<Th>إضافة </Th>
				</Tr>
			</Thead>
			<Tbody>
				{data().map(({ _id, emp_name, salary_date, emp_id }) => {
					const deleteFunction = async () => {
						await handleFormDelete({
							deleteUrl: "sal",
							id: _id,

							handleDelete,

							secondDelete: () =>
								(state.allSal = snap.allSal.filter((item) => item._id !== _id)),
						});
					};
					return (
						<Tr key={_id}>
							<Td>{emp_name}</Td>
							<Td>{salary_date}</Td>
							<Td
								onClick={() => router.push(`/${_id}/salEdit`)}
								cursor={"pointer"}
							>
								<EditIcon color={"green.600"} />
							</Td>
							<Td onClick={deleteFunction} cursor={"pointer"}>
								<DeleteIcon color={"red.300"} />
							</Td>

							<Td>
								<IconButton
									variant="unstyled"
									aria-label="Show Salaries"
									icon={<FaMoneyBillWave />}
									color={`${colors.empDark.substring(
										colors.empDark.length - 4,
										0
									)}`}
									size="1.8rem"
									onClick={() => {
										router.push(`/${emp_id}/showSalPage`);
										setItem("emp", emp_name);
									}}
								/>
							</Td>
							<Td>
								<IconButton
									variant="unstyled"
									aria-label="Add Salary"
									icon={<AddIcon />}
									color={`${colors.empDark.substring(
										colors.empDark.length - 4,
										0
									)}`}
									size="1.5rem"
									onClick={() => {
										router.push(`/${_id}/addSalaryPage`);
										setItem("emp", emp_name);
									}}
								/>
							</Td>
						</Tr>
					);
				})}
			</Tbody>
		</>
	);

	const SalTable = () => (
		<>
			<Thead>
				<Tr>
					<Th
						cursor={"pointer"}
						onClick={() => {
							setDec(!dec);

							sortArray({
								array: state.searchResults,
								key: "salary_date",
								isTrue: dec,
							});
						}}
					>
						تاريخ الإستلام
						{arrowIcon === "salary_date" ? ArrowIcon : ""}
					</Th>

					<Th>الراتب الأساسي</Th>
					<Th>العلاوات</Th>
					<Th>الخصميات</Th>

					<Th>إجمالي الراتب</Th>

					<Th>تعديل</Th>
					<Th>حذف</Th>
				</Tr>
			</Thead>
			<Tbody>
				{data().map(
					({
						_id,
						emp_name,
						salary_date,
						basic_salary,
						bonus,
						loans,
						total_salary,
					}) => {
						const deleteFunction = async () => {
							await handleFormDelete({
								deleteUrl: "sal",
								id: _id,

								handleDelete,

								secondDelete: () =>
									(state.sal = snap.sal.filter((item) => item._id !== _id)),
							});
						};
						return (
							<Tr key={_id}>
								<Td>{salary_date}</Td>
								<Td>{basic_salary}</Td>
								<Td>{bonus}</Td>
								<Td>{loans}</Td>
								<Td>{total_salary}</Td>
								<Td
									onClick={() => router.push(`/${_id}/salEdit`)}
									cursor={"pointer"}
								>
									<EditIcon color={"green.600"} />
								</Td>
								<Td onClick={deleteFunction} cursor={"pointer"}>
									<DeleteIcon color={"red.300"} />
								</Td>
							</Tr>
						);
					}
				)}
			</Tbody>
		</>
	);

	return (
		<Wrap justify={"center"}>
			<WrapItem>
				<Table variant="striped" colorScheme="teal" size={emp && "sm"}>
					<TableCaption
						userSelect={"none"}
						placement="top"
						fontSize={["sm", "md", "xl", "2xl"]}
					>
						{tableTitle}
					</TableCaption>

					{emp && <EmpTable />}
					{allSal && <AllSalTable />}
					{sal && <SalTable />}
				</Table>
			</WrapItem>
		</Wrap>
	);
}
