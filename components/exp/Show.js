import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import autoTable from 'jspdf-autotable';
import { toPDF } from '../../utils/dbConnect';
import { PrintBtn, Title, Btn } from '../comUtil/ComUtil';
import { Center, SimpleGrid } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

import ReactPaginate from 'react-paginate';

export default function Show({ exp }) {
	if (exp.exp.length < 1) return <Title title='لا توجد بيانات للعرض' />;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(exp.length);
	const [text, setText] = useState('المصروفات الحالية:');
	const [payment, setPayment] = useState(false);
	const router = useRouter();
	const inputReference = useRef(null);
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const [currentPage, setCurrentPage] = useState(parseInt(0));
	const PER_PAGE = 12;
	const offset = currentPage * PER_PAGE;

	const rs = searchResults.slice(offset, offset + PER_PAGE);
	const pageCount = Math.ceil(searchResults.length / PER_PAGE);
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	useEffect(() => setCurrentPage(0), [searchResults]);

	useEffect(() => {
		const results = exp.exp.filter((e) => {
			return Object.keys(e).some((key) =>
				e[key]
					.toString()
					.toLowerCase()
					.includes(searchTerm.toString().toLowerCase())
			);
		});

		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);
	}, [searchTerm, exp.exp]);

	function getPaid() {
		setPayment(!payment);
		const results = exp.exp.filter((exps) => {
			return exps.payment_status === payment;
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);
		payment ? setText('المصروفات المسددة:') : setText('المصروفات الغير مسددة:');
	}

	const clear = () => {
		setText('المصروفات الحالية:');
		setSearchTerm('');
		setCarLength(exp.length);
		setSearchResults(
			exp.exp.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);

		inputReference.current.focus();
	};
	const searchByDate = (search) => {
		const results = exp.exp.filter((exps) => {
			return moment(exps.bill_date.toString()).isSame(moment(), search);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);
		if (search === 'week') setText('مصروفات هذا الأسبوع:');
		if (search === 'month') setText('مصروفات هذا الشهر:');
	};

	function printPdf() {
		let count = 0;
		const rows = [];
		searchResults.map((item) => {
			count++;
			rows.push({
				name: item.company_name.toString().toUpperCase(),
				payment_status: item.payment_status ? 'تم السداد' : 'لم يتم السداد',
				bill_number: item.bill_number,
				bill_date: item.bill_date,
				bill_type: item.bill_type,
				bill_amount: item.bill_amount,
				check_date: item.check_date,
				notes: item.notes,
				len: count,
			});
		});

		count = 0;
		const columns = [
			{ title: 'الملاحظات', key: 'notes' },
			{ title: 'تاريخ الشيك', key: 'check_date' },
			{ title: 'قيمة الفاتورة', key: 'bill_amount' },
			{ title: 'نوع الفاتورة', key: 'bill_type' },
			{ title: 'تاريخ الفاتورة', key: 'bill_date' },
			{ title: 'رقم الفاتورة', key: 'bill_number' },
			{ title: 'حالة السداد', key: 'payment_status' },
			{ title: 'اسم الشركة', key: 'name' },
			{ title: '#', key: 'len' },
		];

		return toPDF(rows, columns, 'مصروفات مدرار');
	}

	return (
		<>
			<Container>
				<Title title='مصروفات مدرار' />
				<h3 className='text-muted mt-md-5 mb-4 fa fa-pen-square wr title'>
					{' '}
					{text} {carLength}
				</h3>
				<div className='toRight'>
					<FormControl
						className=' ml-sm-n1 wr '
						ref={inputReference}
						type='text'
						placeholder='البحث في جميع الحقول'
						value={searchTerm}
						onChange={handleChange}
					/>
					{rs.length > 0 && <PrintBtn click={() => printPdf()} />}
					<Btn
						click={() => router.push('/expAdd')}
						title={'إضافة'}
						color={'whatsapp'}
					/>
					<Btn click={() => getPaid()} title={'البحث عبر السداد'} />
					<Btn click={() => searchByDate('week')} title={'الأسبوع الحالي'} />
					<Btn click={() => searchByDate('month')} title={'الشهر الحالي'} />
					<Btn click={() => clear()} title={'عرض الجميع'} />
				</div>
			</Container>
			{rs.length > 0 ? (
				<Center>
					<div className='App wr mt-4'>
						<ReactPaginate
							previousLabel={'→ السابق'}
							nextLabel={'التالي ←'}
							pageCount={pageCount}
							onPageChange={handlePageClick}
							containerClassName={'pagination'}
							previousLinkClassName={'pagination__link'}
							nextLinkClassName={'pagination__link'}
							disabledClassName={'pagination__link--disabled'}
							activeClassName={'pagination__link--active'}
						/>
					</div>
				</Center>
			) : (
				<Title title='لا توجد نتائج' />
			)}
			<Center>
				<SimpleGrid
					columns={[2, null, 4]}
					spacing='15px'
					className=' wr mt-4 text-right'>
					{rs.map((ex) => {
						return (
							<Card key={ex._id} className='mt-4 ml-4 mb-4 mr-4 '>
								<Card.Body className={'wr'}>
									<Card.Title className='font-weight-bolder '>
										<span className='text-muted text-info h4'>اسم الشركة:</span>{' '}
										{ex.company_name}
									</Card.Title>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											رقم الفاتورة:
										</span>{' '}
										{ex.bill_number}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											قيمة الفاتورة:
										</span>{' '}
										{ex.bill_amount}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											حالة السداد:
										</span>{' '}
										{ex.payment_status ? 'تم السداد' : 'لم يتم السداد'}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											نوع الفاتورة:
										</span>{' '}
										{ex.bill_type}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											تاريخ الفاتورة:
										</span>{' '}
										{ex.bill_date}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											تاريخ الشيك:
										</span>{' '}
										{ex.check_date}
									</Card.Text>
									<Card.Text className='mb-1'>
										<span className='text-muted text-info font-weight-bolder'>
											الملاحظات:
										</span>{' '}
										{ex.notes.length > 15
											? `${ex.notes.substring(0, 17)} ...`
											: ex.notes}
									</Card.Text>
								</Card.Body>
								<Card.Footer className='wr text-center'>
									<Button
										size='lg'
										width={36}
										variant='outline'
										colorScheme='facebook'
										mr={4}
										onClick={() =>
											router.push(`http://localhost:3000/${ex._id}/expEdit`)
										}>
										تعديل
									</Button>
								</Card.Footer>
							</Card>
						);
					})}
				</SimpleGrid>
			</Center>
		</>
	);
}
