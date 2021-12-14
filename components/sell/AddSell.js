import React from 'react';
import { Button } from '@chakra-ui/button';
import { post, toCurrency } from '../../utils/dbConnect';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, SimpleGrid } from '@chakra-ui/layout';
import { Field, Form, Formik } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Title } from '../comUtil/ComUtil';
import { useRouter } from 'next/router';

export default function AddSell() {
	const router = useRouter();

	async function addSell(values) {
		values.sell_date = moment(values.sell_date).format('YYYY-MM-DD');
		values.sale_amount = toCurrency(values.sale_amount);
		values.expe = toCurrency(values.expe);
		values.deposit = toCurrency(values.deposit);

		await post('sells', values);
	}
	return (
		<>
			<Title title=' إضافة دخل يومي جديد'></Title>

			<Formik
				initialValues={{
					sale_amount: '',
					expe: '',
					deposit: '',
					sell_date: moment().format('YYYY-MM-DD'),
				}}
				onSubmit={(values, actions) => {
					try {
						setTimeout(() => {
							addSell(values);
							actions.setSubmitting(false);
							actions.resetForm();
						}, 500);
					} catch (error) {
						toast(` حدث خطأ أثناء الحفظ الرجاء المحاولة مجددا ${error}`, {
							type: toast.TYPE.ERROR,
							autoClose: 3000,
						});
					}
				}}
				validationSchema={Yup.object().shape({
					sale_amount: Yup.number()
						.typeError('الدخل اليومي يتكون من أرقام فقط')

						.required('الدخل اليومي مطلوب'),

					expe: Yup.number()
						.typeError('المصروف يجب أن يتكون من أرقام فقط')
						.required('قيمة المصروف مطلوب'),

					deposit: Yup.number()
						.typeError(' الإيداع يجب أن يتكون من أرقام فقط')
						.required('قيمة الإيداع مطلوب'),
					sell_date: Yup.string().trim().required('تاريخ الدخل مطلوب'),
				})}>
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
											<Button
												colorScheme='teal'
												isLoading={props.isSubmitting}
												type='submit'>
												حفظ
											</Button>
											<Box m={2}></Box>
											<Button
												colorScheme='teal'
												type='button'
												onClick={handleReset}
												disabled={!dirty || isSubmitting}>
												مسح
											</Button>
											<Box m={2}></Box>
											<Button
												colorScheme='blue'
												type='button'
												onClick={() => router.push('/showSellPage')}>
												إلغاء / رجوع
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
