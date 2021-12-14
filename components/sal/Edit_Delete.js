import React, { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { handlePut, toCurrency, handleDelete, getSum } from '../../utils/dbConnect';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, SimpleGrid, Stack } from '@chakra-ui/layout';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import ConfirmationModal, { Title } from '../comUtil/ComUtil';
import { useRouter } from 'next/router';

export default function EmpSal({ sal }) {
	const router = useRouter();
	const { id } = router.query;
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleCancel = () => setShow(false);
	const {
		emp_name,
		basic_salary,
		bonus,
		loans,
		total_salary,
		salary_date,
		sal_notes,
		_id,
		emp_id,
	} = sal;
	function showModal(show) {
		if (show)
			return (
				<ConfirmationModal
					show={show}
					handleCancel={handleCancel}
					handleDelete={async () => {
						await handleDelete(`${emp_id}/showSal`, 'sal', _id, router);

						setShow(false);
					}}
					car={''}
				/>
			);
		return;
	}

	async function put(values) {
		values.salary_date = moment(values.salary_date).format('YYYY-MM-DD');

		values.basic_salary = toCurrency(values.basic_salary);
		values.bonus = toCurrency(values.bonus);
		values.loans = toCurrency(values.loans);
		values.total_salary = toCurrency(getSum(values.basic_salary,values.bonus,values.loans))
		handlePut(values, '', `sal/id`, router);
		window.history.back();
	}
	return (
		<>
			{showModal(show)}

			<Title title={`تحديث راتب الموظف ${emp_name}`}></Title>

			<Formik
				initialValues={{
					basic_salary,
					bonus,
					loans,
					total_salary,
					salary_date,
					sal_notes,
					_id,
				}}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(false);
					put(values);
				}}
				validationSchema={Yup.object().shape({
					loans: Yup.string().trim().required('الخصميات مطلوب'),
					basic_salary: Yup.string().trim().required('الراتب الأساسي مطلوب'),
					bonus: Yup.string().trim().required('العلاوات مطلوب'),
					salary_date: Yup.string().required(' تاريخ الراتب مطلوب'),
				})}>
				{(props) => {
					const {
						dirty,
						isSubmitting,
						values,

						handleReset,
					} = props;

					return (
						<Center mb={2}>
							<SimpleGrid minChildWidth='60px' spacing='30px'>
								<Box
									maxW='lg'
									mt={8}
									borderWidth='1px'
									borderRadius='lg'
									overflow='hidden'>
									<Form className='wr ml-4 mr-4 mt-lg-4'>
										<Field name='basic_salary'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.basic_salary &&
														form.touched.basic_salary
													}>
													<FormLabel fontSize='lg'> الراتب الأساسي</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														size='md'
														{...field}
														id='basic_salary'
														placeholder='الراتب الأساسي'
													/>

													<FormErrorMessage>
														{form.errors.basic_salary}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='bonus'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.bonus && form.touched.bonus}>
													<FormLabel fontSize='lg'> العﻻوات</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														size='md'
														{...field}
														id='bonus'
														placeholder='العﻻوات'
													/>

													<FormErrorMessage>
														{form.errors.bonus}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Field name='loans'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.loans && form.touched.loans}>
													<FormLabel fontSize='lg'> الخصميات</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														size='md'
														{...field}
														id='loans'
														placeholder=' الخصميات'
													/>

													<FormErrorMessage>
														{form.errors.loans}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Field name='total_salary'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.total_salary &&
														form.touched.total_salary
													}>
													<FormLabel fontSize='lg'> إجمالي الراتب</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														size='md'
														{...field}
														id='total_salary'
														placeholder='إجمالي الراتب'
														disabled
														value={getSum(
															values.basic_salary,
															values.bonus,
															values.loans
														)}
													/>

													<FormErrorMessage>
														{form.errors.total_salary}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Field name='salary_date'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.salary_date && form.touched.salary_date
													}>
													<FormLabel fontSize='lg'>
														تاريخ إستﻻم الراتب
													</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														type='date'
														size='md'
														{...field}
														id='salary_date'
													/>

													<FormErrorMessage>
														{form.errors.salary_date}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='sal_notes'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.sal_notes && form.touched.sal_notes
													}>
													<FormLabel fontSize='lg'> المﻻحظات</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='right'
														size='md'
														{...field}
														id='sal_notes'
														placeholder=' المﻻحظات'
													/>

													<FormErrorMessage>
														{form.errors.sal_notes}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Center m={4}>
											<Button
												colorScheme='teal'
												isLoading={props.isSubmitting}
												type='submit'>
												حفظ
											</Button>
											<Box m={2}></Box>
											<Button
												colorScheme='red'
												isLoading={props.isSubmitting}
												onClick={() => handleShow()}
												type='button'>
												حذف
											</Button>
											<Box m={2}></Box>
											<Button
												colorScheme='blue'
												type='button'
												onClick={() => window.history.back()}>
												إلغاء
											</Button>
											<Box m={2}></Box>
											<Button
												colorScheme='teal'
												isLoading={props.isSubmitting}
												type='button'
												onClick={handleReset}
												disabled={!dirty}>
												مسح
											</Button>
										</Center>
									</Form>
								</Box>
							</SimpleGrid>
						</Center>
					);
				}}
			</Formik>
		</>
	);
}
