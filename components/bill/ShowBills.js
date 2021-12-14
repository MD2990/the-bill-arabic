import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { Title, Btn } from '../comUtil/ComUtil';
import autoTable from 'jspdf-autotable';
import { toPDF } from '../../utils/dbConnect';
import { PrintBtn } from '../comUtil/ComUtil';
import { Center, SimpleGrid } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

export default function RentForm({ billData }) {
	if (billData.bill.length < 1) return <Title title='لا توجد بيانات للعرض' />;
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(billData.bill.length);
	const [text, setText] = useState('الفواتير الحالية:');
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
		const results = billData.bill.filter((e) => {
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
	}, [searchTerm, billData.bill]);

	function getPaid() {
		setPayment(!payment);
		const results = billData.bill.filter((car) => {
			return car.payment_status === payment;
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);
		payment ? setText('الفواتير المسددة:') : setText('الفواتير الغير مسددة:');
	}

	const clear = () => {
		setText('الفواتير الحالية:');
		setSearchTerm('');
		setSearchResults(
			billData.bill.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);

		setCarLength(billData.bill.length);
		inputReference.current.focus();
	};
	const searchByDate = (search) => {
		const results = billData.bill.filter((car) => {
			return moment(car.bill_date.toString()).isSame(moment(), search);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1))
		);
		if (search === 'week') setText('فواتير الأسبوع الحالي:');
		if (search === 'month') setText('فواتير الشهر الحالي:');
	};

	function printPdf() {
		let count = 0;
		const rows = [];
		searchResults.map((item) => {
			count++;
			rows.push({
				company_name: item.company_name.toString().toUpperCase(),
				bill_number: item.bill_number,
				bill_amount: item.bill_amount,
				bill_type: item.bill_type,
				bill_date: item.bill_date,
				check_date: item.check_date,
				payment_status: item.payment_status ? 'تم السداد' : 'لم يتم السداد',
				notes: item.sal_notes,
				len: count,
			});
		});

		count = 0;
		const columns = [
			{ title: 'الملاحظات', key: 'notes' },
			{ title: 'حالة السداد', key: 'payment_status' },
			{ title: 'تاريخ الشيك', key: 'check_date' },
			{ title: 'تاريخ الفاتورة', key: 'bill_date' },
			{ title: 'نوع الفاتورة', key: 'bill_type' },
			{ title: 'قيمة الفاتورة', key: 'bill_amount' },
			{ title: 'رقم الفاتورة', key: 'bill_number' },
			{ title: 'اسم الشركة', key: 'company_name' },
			{ title: '#', key: 'len' },
		];

		return toPDF(rows, columns, 'تفاصيل الفواتير');
	}
	return (
		<>
			<Title title='تفاصيل الفواتير' />
			<Container>
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
						click={() => router.push('/addNewBillPage')}
						title={'إضافة فاتورة'}
						color={'whatsapp'}
					/>

					<Btn
						click={() => getPaid()}
						title='البحث عبر السداد'
						color='facebook'
					/>
					<Btn
						click={() => searchByDate('week')}
						title='فواتير الأسبوع الحالي'
						color='facebook'
					/>

					<Btn
						click={() => searchByDate('month')}
						title='فواتير الشهر الحالي'
						color='facebook'
					/>

					<Btn click={() => clear()} title='عرض الجميع' color='facebook' />
				</div>
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
						columns={[2, null, 3]}
						spacing='20px'
						className=' wr mt-4'>
						{rs.map((car) => {
							return (
								<Card
									key={car._id}
									xl={3}
									style={{ width: '18em' }}
									//mb-sm-2 mr-sm-2 text-right text-truncate
									className={`${
										car.payment_status
											? ' bg-success text-white mb-sm-2 mr-sm-2 text-right text-truncate'
											: 'bg-danger text-white  mb-sm-2 mr-sm-2 text-right text-truncate'
									} `}>
									<Card.Body>
										<Card.Title className='wr text-white'>
											الشركة: {car.company_name}
										</Card.Title>
										<Card.Subtitle className='mb-2  text-white font-weight-bolder wr'>
											رقم الفاتورة: {car.bill_number}
										</Card.Subtitle>
										<Card.Text className='mb-1'>
											<span className='text-white font-weight-bolder'>
												تاريخ الفاتورة:{' '}
											</span>
											{car.bill_date}
										</Card.Text>
										<Card.Text className='mb-1'>
											<span className='text-white font-weight-bolder'>
												نوع الفاتورة:{' '}
											</span>
											{car.bill_type}
										</Card.Text>

										<Card.Text className='mb-1'>
											<span className='text-white font-weight-bolder'>
												مبلغ الفاتورة:{' '}
											</span>
											{car.bill_amount}
										</Card.Text>
										<Card.Text className='mb-1'>
											<span className='text-white font-weight-bolder'>
												حالة السداد:{' '}
											</span>
											{car.payment_status ? 'تم السداد' : 'لم يتم السداد'}
										</Card.Text>

										<Card.Text className='mb-1 wr'>
											<span className='text-white font-weight-bolder'>
												الملاحظات:{' '}
											</span>
											{car.notes.substring(0, 15)} ...
										</Card.Text>

										<button
											//className='btn btn-sm btn-blue-grey wr text-white'
											className={`${
												car.payment_status
													? ' btn btn-sm btn-success border-white wr '
													: 'btn btn-sm btn-danger border-white wr'
											} `}
											onClick={() => {
												router.push(
													`http://localhost:3000/${car._id}/billEdit`
												);
											}}>
											<span className='font-weight-bolder lead'>تعديل</span>
											{'  '}
										</button>
									</Card.Body>
								</Card>
							);
						})}
					</SimpleGrid>
				</Center>
			</Container>
		</>
	);
}
