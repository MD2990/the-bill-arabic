import React from 'react';
import { Button } from '@chakra-ui/button';
import { getSum, post, toCurrency } from '../../utils/dbConnect';
import { useRouter } from 'next/router';
import { Textarea, Input } from '@chakra-ui/react';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/form-control';
import { Box, Center, SimpleGrid } from '@chakra-ui/layout';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { Title } from '../comUtil/ComUtil';

export default function Add({ sal }) {
	{
		const router = useRouter();

		async function addSalary(values) {
			values.salary_date = moment(values.salary_date).format('YYYY-MM-DD');
			values.basic_salary = toCurrency(values.basic_salary);
			values.bonus = toCurrency(values.bonus);
			values.loans = toCurrency(values.loans);
			values.total_salary = toCurrency(getSum(values.bonus, values.basic_salary, values.loans));
			post('sal', values);
		}

		return (
			<>
				<Title title={` إضافة راتب للموظف: ${sal.emp_name} `}></Title>

				<Formik
					initialValues={{
						basic_salary: '',
						bonus: '',
						loans: '',
						total_salary: '',
						sal_notes: 'ﻻ توجد ملاحظات',
						salary_date: moment().format('YYYY-MM-DD'),
						emp_id: sal._id,
						emp_name: sal.emp_name,
					}}
					onSubmit={async (values, actions) => {
						actions.setSubmitting(false);
						await addSalary(values);
						actions.resetForm();
						//window.history.back();
					}}
					validationSchema={Yup.object().shape({
						bonus: Yup.string().required('قيمة العﻻوة مطلوب'),
						loans: Yup.string().required('قيمة الخصميات مطلوب'),
						//total_salary: Yup.string().required('مجموع الراتب مطلوب'),
						basic_salary: Yup.string().required('الراتب الأساسي مطلوب'),
						salary_date: Yup.string().required('تاريخ الراتب مطلوب'),
					})}>
					{(props) => {
						const { dirty, isSubmitting, handleReset, values } = props;

						return (
							<Center mb={2}>
								<SimpleGrid minChildWidth='60px' spacing='30px'>
									<Box maxW='250' mt={8} overflow='hidden'>
										<Form className='wr ml-4 mr-4 mt-lg-4'>
											<Field name='basic_salary'>
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors.basic_salary &&
															form.touched.basic_salary
														}>
														<FormLabel fontSize='xl'>الراتب الأساسي</FormLabel>

														<Input
															marginTop={-2}
															marginBottom={4}
															textAlign='right'
															size='lg'
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
														<FormLabel fontSize='xl'> العلاوات</FormLabel>

														<Input
															marginTop={-2}
															marginBottom={4}
															textAlign='right'
															size='lg'
															{...field}
															id='bonus'
															placeholder='العلاوات'
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
														<FormLabel fontSize='xl'> الخصميات</FormLabel>

														<Input
															marginTop={-2}
															marginBottom={4}
															textAlign='right'
															size='lg'
															{...field}
															id='loans'
															placeholder='الخصميات'
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
														<FormLabel fontSize='xl'> مجموع الراتب</FormLabel>

														<Input
															marginTop={-2}
															marginBottom={4}
															textAlign='right'
															size='lg'
															{...field}
															id='total_salary'
															disabled
															placeholder='مجموع الراتب'
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
															form.errors.salary_date &&
															form.touched.salary_date
														}>
														<FormLabel fontSize='xl'>التاريخ</FormLabel>

														<Input
															marginTop={-2}
															marginBottom={4}
															textAlign='right'
															type='date'
															size='lg'
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
														<FormLabel fontSize='xl' pb={'4'}>
															{' '}
															الملاحظات
														</FormLabel>

														<Textarea
															marginTop={-6}
															marginBottom={4}
															textAlign='right'
															size='lg'
															{...field}
															id='sal_notes'
															placeholder='الملاحظات'
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
													disabled={!dirty || isSubmitting}>
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
}
