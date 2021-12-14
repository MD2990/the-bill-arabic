import React, { useState } from 'react';
import ConfirmationModal, { Title } from '../comUtil/ComUtil';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
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
import {
	post,
	toCurrency,
	handlePut,
	handleDelete,
} from '../../utils/dbConnect';
import { useRouter } from 'next/router';

export default function Edit_Delete_Arch_Bill({ bill }) {
	const billArchURL = 'http://localhost:3000/billArchPage/';
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
					handleDelete={async () => {
						await handleDelete('billArchPage', 'BillArch', bill._id, router);
						setShow(false);
					}}
					car={bill.bill_number}
				/>
			);
		return;
	}

	const putData = async (values) => {
		values.bill_date = moment(values.bill_date).format('YYYY-MM-DD');
		values.check_date = moment(values.check_date).format('YYYY-MM-DD');

		values.bill_amount = toCurrency(values.bill_amount);

		handlePut(values, values.biil_number, 'BillArch', router);
	};

	async function handleUnArchive(values) {
		if (
			confirm(
				`هل تريد نقل الفاتورة رقم ${values.bill_number} إلى الفواتير الحالية ؟  `
			)
		) {
			await handleDelete('billArchPage', 'BillArch', bill._id, router);
			await post('bills', values);
		}
	}

	return (
		<>
			{showModal(show)}
			<Title title={`تحديث الفاتورة رقم ${bill.bill_number}`} />

			<Formik
				initialValues={{
					company_name: bill.company_name,
					bill_number: bill.bill_number,
					bill_date: bill.bill_date,
					bill_type: bill.bill_type,
					bill_amount: bill.bill_amount,
					payment_status: bill.payment_status,
					check_date: bill.check_date,

					notes: bill.notes,
				}}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(false);
					await putData(values);
					router.replace('/billArchPage');
				}}
				validationSchema={Yup.object().shape({
					company_name: Yup.string().trim().required('اسم الشركة مطلوب'),
					bill_number: Yup.string().trim().required('رقم الفاتورة مطلوب'),
					bill_type: Yup.string()
						.trim()

						.required('نوع الفاتورة مطلوب'),
					bill_amount: Yup.string().required('قيمة الفاتورة مطلوب'),
					payment_status: Yup.string().trim().required('حالة السداد مطلوب'),
					check_date: Yup.string().required('تاريخ الشيك مطلوب'),
					bill_date: Yup.string().required('تاريخ الفاتورة مطلوب'),
				})}>
				{(props) => {
					const {
						values,
						touched,
						errors,
						dirty,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
						handleReset,
					} = props;

					return (
						<Form className='wr'>
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
																fontSize='larger'
																fontWeight='black'
																htmlFor='payment_status'>
																{values.payment_status
																	? 'تم السداد'
																	: 'لم يتم السداد'}{' '}
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
														size='md'
														colorScheme='teal'
														isLoading={props.isSubmitting}
														type='submit'>
														حفظ
													</Button>

													<Link href={'/billArchPage'}>
														<a>
															<Button
																size='md'
																colorScheme='blue'
																type='button'>
																إلغاء / رجوع{' '}
															</Button>
														</a>
													</Link>

													<Button
														size='md'
														colorScheme='red'
														type='button'
														onClick={() => handleShow()}>
														حذف
													</Button>
													<Button
														size='md'
														colorScheme='orange'
														type='button'
														onClick={() => handleUnArchive(values)}>
														نقل إلى الفواتير الحالية
													</Button>
													<Button
														size='md'
														colorScheme='pink'
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
