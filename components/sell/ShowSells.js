import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { Btn, Title } from '../comUtil/ComUtil';
import autoTable from 'jspdf-autotable';
import { toPDF } from '../../utils/dbConnect';
import { PrintBtn } from '../comUtil/ComUtil';
import { Button } from '@chakra-ui/button';
import { Center, SimpleGrid } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

export default function ShowDailyBills({ carData }) {
	if (carData.sell.length < 1) return <Title title='لا توجد بيانات للعرض' />;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(carData.sell.length);
	const [text, setText] = useState('الدخل الحالي:');
	const router = useRouter();
	const inputReference = useRef(null);
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};
	// pagination
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
		const results = carData.sell.filter((e) => {
			return Object.keys(e).some((key) =>
				e[key]
					.toString()
					.toLowerCase()
					.includes(searchTerm.toString().toLowerCase())
			);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.sell_date < b.sell_date ? 1 : -1))
		);
	}, [searchTerm, carData.sell]);

	const clear = () => {
		setText('الدخل الحالي:');
		setSearchTerm('');
		setCarLength(carData.length);
		setSearchResults(
			carData.sell.sort((a, b) => (a.sell_date < b.sell_date ? 1 : -1))
		);

		inputReference.current.focus();
	};

	const searchByDate = (search) => {
		const results = carData.sell.filter((car) => {
			return moment(car.sell_date.toString()).isSame(moment(), search);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.sell_date < b.sell_date ? 1 : -1))
		);
		if (search === 'week') setText('دخل الأسبوع الحالي:');
		if (search === 'month') setText('دخل الشهر الحالي:');
		if (search === 'year') setText('دخل السنة الحالية:');
	};

	function printPdf() {
		let count = 0;
		const rows = [];
		searchResults.map((item) => {
			count++;
			rows.push({
				sale_amount: item.sale_amount,
				expe: item.expe,
				deposit: item.deposit,
				sell_date: item.sell_date,
				len: count,
			});
		});
		// This should be returned to 0 otherwise it will continue counting when you again press Print
		count = 0;

		const columns = [
			{ title: 'التاريخ', key: 'sell_date' },
			{ title: 'الإيداع', key: 'deposit' },
			{ title: 'المصروفات', key: 'expe' },
			{ title: 'الدخل', key: 'sale_amount' },
			{ title: '#', key: 'len' },
		];

		return toPDF(rows, columns, 'تفاصيل الدخل اليومي');
	}

	return (
		<>
			<Title title='تفاصيل الدخل اليومي' />
			<Container>
				<h3 className='text-muted mt-md-5 mb-4 fa fa-pen-square wr title'>
					{' '}
					{text} {carLength}
				</h3>
				<div className='toRight'>
					<FormControl
						className='ml-sm-n1 wr p-4 font-weight-bolder form-control-lg'
						ref={inputReference}
						type='text'
						placeholder='البحث في جميع الحقول'
						value={searchTerm}
						onChange={handleChange}
					/>
					{rs.length > 0 && <PrintBtn click={() => printPdf()} />}
					<Btn
						click={() => router.push('/addNewSellPage')}
						title={'إضافة'}
						color={'whatsapp'}
					/>

					<Btn
						click={() => searchByDate('year')}
						title={'السنة الحالية'}
						color='facebook'
					/>
					<Btn
						click={() => searchByDate('month')}
						title={'الشهر الحالي'}
						color='facebook'
					/>
					<Btn
						click={() => searchByDate('week')}
						title={'الأسبوع الحالي'}
						color='facebook'
					/>
					<Btn click={() => clear()} title={'عرض الجميع'} color='facebook' />
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
									style={{ width: '18em' }}
									className='mb-sm-2 mr-sm-2 text-right text-truncate shadow-sm bg-light'>
									<Card.Body>
										<Card.Title className='wr teal-text font-weight-bolder text-success'>
											الدخل: {car.sale_amount}
										</Card.Title>
										<Card.Subtitle className='mb-2 wr '>
											الإيداع:{' '}
											<span className='font-weight-bolder ml-1 wr mb-2 h5-responsive '>
												{car.deposit}
											</span>
										</Card.Subtitle>
										<Card.Text className='text-truncate wr mb-2 '>
											المصروفات:{' '}
											<span className='font-weight-bolder ml-1 h5-responsive '>
												{car.expe}
											</span>
											<br />
											التاريخ:{' '}
											<span className=' font-weight-bolder  ml-1 h5-responsive '>
												{car.sell_date}
											</span>
											<br />
										</Card.Text>
										<Button
											colorScheme='whatsapp'
											onClick={() =>
												router.push(`http://localhost:3000/${car._id}/sellEdit`)
											}>
											<i className='fa fa-edit'>
												{'  '}تعديل{'    '}
											</i>
										</Button>
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
