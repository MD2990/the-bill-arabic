import React from 'react';
import { Box, Center } from '@chakra-ui/layout';
import { Button, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

export function Title({ title }) {
	return (
		<Center>
			<Box mt={10} fontSize={50} color={'teal.500'} fontWeight={'extrabold'}>
				{'  '}
				{title}
				{'  '}
			</Box>
		</Center>
	);
}

export function PrintBtn({ click }) {
	return (
		<Button
			colorScheme='twitter'
			variant='solid'
			mr={2}
			mt={2}
			onClick={() => click()}>
			<span className='font-weight-bolder lead'>طباعة{'     '}</span>
		</Button>
	);
}

export function Btn({ click, title, color = 'facebook', vari = 'solid' }) {
	return (
		<Button
			colorScheme={color}
			variant={vari}
			mr={2}
			mt={2}
			onClick={() => click()}>
			<span className='font-weight-bolder lead'>{title}</span>
		</Button>
	);
}

export function Spans() {
	return (
		<Center mt={200}>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='teal'
				size='xl'
			/>
		</Center>
	);
}

export function Hd({ title }) {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}
export default function ConfirmationModal({
	show,
	handleCancel,
	handleDelete,
	car,
}) {
	return (
		<>
			<Modal show={show} onHide={handleCancel}>
				<Modal.Header closeButton>
					<Modal.Title className='toRight wr'>حذف</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-center wr'>
					<h6 className='form-control-lg'>
						{' '}
						هل تريد حذف الملف الحالي ؟{'  '}
						<span className='text-danger text-xl-center font-weight-bolder wr underline '>
							<u>{car} </u>
						</span>{' '}
					</h6>{' '}
				</Modal.Body>
				<Modal.Footer>
					<Button
						className='wr'
						variant='outline'
						colorScheme='gray'
						onClick={handleCancel}>
						إلغاء
					</Button>
					<Button
						className='wr'
						variant='outline'
						colorScheme='red'
						onClick={() => handleDelete()}>
						حذف
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
