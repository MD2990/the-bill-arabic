import React from 'react';
import { Title } from '../comUtil/ComUtil';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { post, toCurrency } from '../../utils/dbConnect';
import { toast } from 'react-toastify';
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

export default function AddBill() {
	const validationSchema = Yup.object().shape({
		company_name: Yup.string().trim().required('اسم الشركة مطلوب'),
		bill_number: Yup.string().trim().required('رقم الفاتورة مطلوب'),
		bill_type: Yup.string().trim().required('نوع الفاتورة مطلوب'),
		bill_amount: Yup.number()
			.typeError(' الفاتورة يجب أن يتكون من أرقام فقط')
			.required('قيمة الفاتورة مطلوب'),
		bill_date: Yup.string().trim().required('تاريخ الفاتورة مطلوب'),
	});

	async function add(values) {
		values.bill_date = moment(values.bill_date).format('YYYY-MM-DD');
		values.bill_amount = toCurrency(values.bill_amount);
		await post('bills', values);
	}

	return (
		<Formik
			initialValues={{
				company_name: '',
				bill_number: '',
				bill_date: moment().format('YYYY-MM-DD'),
				bill_type: 'كاش',
				bill_amount: '',
				payment_status: !!false,
				check_date: '2000-01-01',
				notes: 'لا توجد',
			}}
			onSubmit={(values, actions) => {
				try {
					setTimeout(() => {
						actions.setSubmitting(false);
						add(values);
						actions.resetForm();
					}, 500);
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
						<Title title='إضافة فاتورة' />
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
															form.errors.check_date && form.touched.check_date
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
														isInvalid={form.errors.notes && form.touched.notes}>
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
													colorScheme='teal'
													isLoading={props.isSubmitting}
													type='submit'>
													حفظ
												</Button>

												<Link href={'/showBillPage'}>
													<a>
														<Button size='lg' colorScheme='blue' type='button'>
															إلغاء / رجوع{' '}
														</Button>
													</a>
												</Link>

												<Button
													size='lg'
													colorScheme='red'
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
	);
}
