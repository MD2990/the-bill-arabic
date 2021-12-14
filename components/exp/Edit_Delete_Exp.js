import React, { useState } from 'react';
import { Title } from '../comUtil/ComUtil';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toCurrency, handlePut, handleDelete } from '../../utils/dbConnect';
import { toast } from 'react-toastify';
import moment from 'moment';
import ConfirmationModal from '../comUtil/ComUtil';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Input,
	HStack,
	VStack,
	Wrap,
	Center,
	WrapItem,
	Switch,
	Textarea,
} from '@chakra-ui/react';

export default function Edit_Delete_Exp({ formData }) {
	const validationSchema = Yup.object().shape({
		company_name: Yup.string().trim().required('اسم الشركة مطلوب'),
		bill_number: Yup.string().trim().required('رقم الفاتوره مطلوب'),
		bill_date: Yup.string().required('تاريخ الفاتوره مطلوب'),
		bill_type: Yup.string().trim().required('نوع الفاتورة مطلوب'),
		bill_amount: Yup.string().trim().required('قيمة الفاتورة مطلوبة'),
		check_date: Yup.string().required('تاريخ الشيك مطلوب'),
	});

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
					handleDelete={async () =>
						handleDelete('exp', 'exp', formData._id, router)
					}
					car={formData.bill_date}
				/>
			);
		return;
	}

	async function put(values) {
		values.check_date = moment(values.check_date).format('YYYY-MM-DD');
		values.bill_date = moment(values.bill_date).format('YYYY-MM-DD');
		values.bill_amount = toCurrency(values.bill_amount);
		handlePut(values, values.bill_number, 'exp', router);
		router.replace('/exp');
	}
	return (
		<>
			{showModal(show)}

			<Formik
				initialValues={{
					company_name: formData.company_name,
					bill_number: formData.bill_number,
					bill_date: formData.bill_date,
					bill_type: formData.bill_type,
					bill_amount: formData.bill_amount,
					payment_status: formData.payment_status,
					check_date: formData.check_date,
					notes: formData.notes,
				}}
				onSubmit={async (values, actions) => {
					try {
						await put(values);
						actions.setSubmitting(false);
					} catch (error) {
						toast(` حدث خطأ أثناء الحفظ الرجاء المحاولة مجددا ${error}`, {
							type: toast.TYPE.ERROR,
							autoClose: 3000,
						});
					}
				}}
				validationSchema={validationSchema}>
				{(props) => {
					const { dirty, isSubmitting, values, handleReset } = props;

					return (
						<Form className='wr'>
							<Title title={`تحديث الفاتورة رقم: ${formData.bill_number}`} />
							<Center>
								<Wrap
									w='680px'
									spacing='30px'
									justify='center'
									borderWidth='1px'
									borderRadius='lg'
									p={8}
									mt={8}>
									<WrapItem>
										<Center>
											<VStack>
												<Field name='company_name'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.company_name &&
																form.touched.company_name
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='company_name'>
																اسم الشركه
															</FormLabel>
															<Input
																{...field}
																id='company_name'
																placeholder='اسم الشركه'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.company_name}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='bill_number'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.bill_number &&
																form.touched.bill_number
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='bill_number'>
																رقم الفاتوره
															</FormLabel>
															<Input
																{...field}
																id='bill_number'
																placeholder='رقم الفاتوره'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.bill_number}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='bill_date'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.bill_date && form.touched.bill_date
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='bill_date'>
																تاريخ الفاتوره
															</FormLabel>
															<Input
																{...field}
																id='bill_date'
																placeholder='تاريخ الفاتوره'
																size='lg'
																type='date'
															/>
															<FormErrorMessage>
																{form.errors.bill_date}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>{' '}
												<Field name='bill_type'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.bill_type && form.touched.bill_type
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='bill_type'>
																نوع الفاتورة
															</FormLabel>
															<Input
																{...field}
																id='bill_type'
																placeholder='نوع الفاتورة'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.bill_type}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
											</VStack>
										</Center>
									</WrapItem>
									<WrapItem>
										<Center>
											<VStack>
												<Field name='bill_amount'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.bill_amount &&
																form.touched.bill_amount
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='bill_amount'>
																قيمة الفاتورة
															</FormLabel>
															<Input
																{...field}
																id='bill_amount'
																placeholder='قيمة الفاتورة'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.bill_amount}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>{' '}
												<Field name='payment_status'>
													{({ field, form }) => (
														<FormControl
															display='flex'
															alignItems='right'
															isInvalid={
																form.errors.payment_status &&
																form.touched.payment_status
															}>
															<FormLabel
																className='ml-4'
																fontSize='larger'
																fontWeight='black'
																htmlFor='payment_status'>
																{values.payment_status
																	? 'تم السداد'
																	: 'لم يتم السداد'}
															</FormLabel>

															<Switch
																colorScheme='whatsapp'
																{...field}
																id='payment_status'
																size='md'
																isChecked={values.payment_status}
															/>

															<FormErrorMessage>
																{form.errors.payment_status}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='check_date'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.check_date &&
																form.touched.check_date
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='check_date'>
																تاريخ الشيك ان وجد
															</FormLabel>
															<Input
																{...field}
																id='check_date'
																type='date'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.check_date}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='notes'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.notes && form.touched.notes
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='notes'>
																الملاحظات
															</FormLabel>
															<Textarea
																{...field}
																id='notes'
																placeholder='الملاحظات'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.notes}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
											</VStack>
										</Center>
									</WrapItem>

									<WrapItem>
										<VStack mb={-6}>
											<Center>
												<HStack>
													<Button
														size='lg'
														variant='outline'
														colorScheme='whatsapp'
														isLoading={props.isSubmitting}
														type='submit'>
														حفظ وإغلاق
													</Button>
													<Button
														variant='outline'
														size='lg'
														colorScheme='red'
														isLoading={props.isSubmitting}
														type='button'
														onClick={handleShow}>
														حذف
													</Button>

													<Link href={'/exp'}>
														<a>
															<Button
																variant='outline'
																size='lg'
																colorScheme='blue'
																type='button'>
																إلغاء
															</Button>
														</a>
													</Link>
													<Button
														variant='outline'
														size='lg'
														colorScheme='blue'
														type='button'
														onClick={handleReset}
														disabled={!dirty}>
														مسح
													</Button>
												</HStack>
											</Center>
										</VStack>
									</WrapItem>
								</Wrap>
							</Center>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}
