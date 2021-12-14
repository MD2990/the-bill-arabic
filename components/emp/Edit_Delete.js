import React, { useState } from 'react';
import { Title } from '../comUtil/ComUtil';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { handleDelete, handlePut, handlePutEmp } from '../../utils/dbConnect';
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
	Textarea,
} from '@chakra-ui/react';
import ConfirmationModal from '../comUtil/ComUtil';

import { useRouter } from 'next/router';
export default function Edit_Delete({ emp }) {
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
						await handleDelete('emp', 'emp', emp._id, router);
						await handleDelete('emp', 'sal/del', emp._id, router);
						setShow(false);
					}}
					car={emp.emp_name}
				/>
			);
		return;
	}
	const validationSchema = Yup.object().shape({
		emp_name: Yup.string().trim().required('اسم الموظف مطلوب'),
		job: Yup.string().trim().required(' المهنه مطلوبة'),
		civil_id: Yup.string().required('الرقم المدني أو الإقامة مطلوب'),
		passport_number: Yup.string().trim().required('رقم الجواز مطلوب'),
		empl_Date: Yup.string().required('تاريخ التعيين مطلوب'),
	});

	async function put(values) {
		values.empl_Date = moment(values.empl_Date).format('YYYY-MM-DD');
		await handlePut(values, emp_name, 'emp', router);

		//to update employee name in salary table
		await handlePutEmp(values.emp_name, 'sal/name', router);
		router.replace('/emp');
	}
	const {
		emp_name,
		job,
		civil_id,
		passport_number,
		empl_Date = moment().format('YYYY-MM-DD'),
		notes = 'لا توجد ملاحظات',
	} = emp;

	return (
		<>
			{showModal(show)}

			<Formik
				initialValues={{
					emp_name,
					job,
					civil_id,
					passport_number,
					empl_Date,
					notes,
				}}
				onSubmit={(values, actions) => {
					try {
						setTimeout(() => {
							put(values);
							actions.setSubmitting(false);
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
							<Title title={`تعديل بيانات الموظف : ${emp_name}`} />
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
												<Field name='emp_name'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.emp_name && form.touched.emp_name
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='emp_name'>
																اسم العامل
															</FormLabel>
															<Input
																{...field}
																id='emp_name'
																placeholder='اسم العامل'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.emp_name}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='job'>
													{({ field, form }) => (
														<FormControl
															isInvalid={form.errors.job && form.touched.job}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='job'>
																المهنة
															</FormLabel>
															<Input
																{...field}
																id='job'
																placeholder='المهنة'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.job}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<Field name='civil_id'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.civil_id && form.touched.civil_id
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='civil_id'>
																الرقم المدني( الإقامة)
															</FormLabel>
															<Input
																{...field}
																id='civil_id'
																placeholder='الرقم المدني( الإقامة) '
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.civil_id}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>{' '}
											</VStack>
										</Center>
									</WrapItem>
									<WrapItem>
										<Center>
											<VStack>
												<Field name='passport_number'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.passport_number &&
																form.touched.passport_number
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='passport_number'>
																رقم الجواز
															</FormLabel>
															<Input
																{...field}
																id='passport_number'
																placeholder='رقم الجواز'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.passport_number}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>

												<Field name='empl_Date'>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors.empl_Date && form.touched.empl_Date
															}>
															<FormLabel
																fontSize='larger'
																fontWeight='black'
																htmlFor='empl_Date'>
																تاريخ التعيين
															</FormLabel>
															<Input
																{...field}
																id='empl_Date'
																type='date'
																size='lg'
															/>
															<FormErrorMessage>
																{form.errors.empl_Date}
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
														colorScheme='teal'
														isLoading={props.isSubmitting}
														type='submit'>
														حفظ
													</Button>

													<Button
														size='lg'
														colorScheme='red'
														isLoading={props.isSubmitting}
														type='button'
														onClick={() => handleShow()}>
														حذف
													</Button>

													<Link href={'/emp'}>
														<a className='text-decoration-none'>
															<Button
																size='lg'
																colorScheme='blue'
																type='button'>
																إلغاء
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
		</>
	);
}
