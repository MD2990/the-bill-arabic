import React, { useState } from 'react';
import { Button } from '@chakra-ui/button';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, HStack, SimpleGrid } from '@chakra-ui/layout';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import ConfirmationModal, { Title } from '../comUtil/ComUtil';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	post,
	toCurrency,
	handlePut,
	handleDelete,
} from '../../utils/dbConnect';
import moment from 'moment';

export default function Edit_Delete({ sell }) {
	const router = useRouter();
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleCancel = () => setShow(false);
	function showModal(show) {
		if (show)
			return (
				<ConfirmationModal
					show={show}
					handleCancel={handleCancel}
					handleDelete={() =>
						handleDelete('showSellPage', 'sells', sell._id, router)
					}
					car={sell.sell_date}
				/>
			);
		return;
	}

	async function handelArchive(values) {
		if (confirm('هل تريد نقل بيانات الدخل اليومي الحالي إلى الأرشيف؟')) {
			values.sell_date = moment(values.bill_date).format('YYYY-MM-DD');
			values.expe = toCurrency(values.expe);
			values.deposit = toCurrency(values.deposit);
			values.sale_amount = toCurrency(values.sale_amount);
			post('SellArch', values);
			handleDelete('showSellPage', 'sells', sell._id, router);
		}
	}

	async function put(values) {
		values.sell_date = moment(values.sell_date).format('YYYY-MM-DD');
		values.sale_amount = toCurrency(values.sale_amount);
		values.expe = toCurrency(values.expe);
		values.deposit = toCurrency(values.deposit);
		handlePut(values, values.sell_date, 'sells', router);
		router.replace('/showSellPage');
	}
	const validationSchema = Yup.object().shape({
		sale_amount: Yup.string()
			.trim()

			.required('الدخل اليومي مطلوب'),

		expe: Yup.string()
			.trim()

			.required('قيمة المصروف مطلوب'),

		deposit: Yup.string()
			.trim()

			.required('قيمة الإيداع مطلوب'),
		sell_date: Yup.string().trim().required('تاريخ الدخل مطلوب'),
	});

	const { sale_amount, expe, deposit, sell_date } = sell;

	return (
		<>
			{showModal(show)}

			<Title title='تعديل بيانات الدخل اليومي' />

			<Formik
				initialValues={{
					sale_amount,
					expe,
					deposit,
					sell_date,
				}}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(false);
					await put(values);
				}}
				validationSchema={validationSchema}>
				{(props) => {
					const {
						dirty,
						isSubmitting,

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
										<Field name='sale_amount'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.sale_amount && form.touched.sale_amount
													}>
													<FormLabel fontSize='lg'>الدخل اليومي</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='center'
														size='md'
														{...field}
														id='sale_amount'
														placeholder='الدخل اليومي'
													/>

													<FormErrorMessage>
														{form.errors.sale_amount}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='expe'>
											{({ field, form }) => (
												<FormControl
													isInvalid={form.errors.expe && form.touched.expe}>
													<FormLabel fontSize='lg'>المصروف</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='center'
														size='md'
														{...field}
														id='expe'
														placeholder='المصروف'
													/>

													<FormErrorMessage>
														{form.errors.expe}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='deposit'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.deposit && form.touched.deposit
													}>
													<FormLabel fontSize='lg'>المتبقي للإيداع</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='center'
														size='md'
														{...field}
														id='deposit'
														placeholder='المتبقي للإيداع'
													/>

													<FormErrorMessage>
														{form.errors.deposit}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name='sell_date'>
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.sell_date && form.touched.sell_date
													}>
													<FormLabel fontSize='lg'>التاريخ</FormLabel>

													<Input
														className='mt-sm-n4 mb-2'
														textAlign='center'
														type='date'
														size='md'
														{...field}
														id='sell_date'
													/>

													<FormErrorMessage>
														{form.errors.sell_date}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										<Center m={4}>
											<HStack>
												<Button
													colorScheme='teal'
													isLoading={props.isSubmitting}
													type='submit'>
													حفظ
												</Button>

												<Button
													colorScheme='red'
													isLoading={props.isSubmitting}
													type='button'
													onClick={handleShow}>
													حذف
												</Button>

												<Button
													colorScheme='orange'
													isLoading={props.isSubmitting}
													type='button'
													onClick={() => handelArchive(props.values)}
													disabled={isSubmitting}>
													نقل إلى الأرشيف
												</Button>

												<Button
													colorScheme='teal'
													type='button'
													onClick={handleReset}
													disabled={!dirty}>
													مسح
												</Button>

												<Button
													colorScheme='blue'
													type='button'
													onClick={() => router.replace('/showSellPage')}>
													إلغاء
												</Button>
											</HStack>
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