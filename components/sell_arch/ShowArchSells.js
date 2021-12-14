import { SimpleGrid } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/layout';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { Title, Btn } from '../comUtil/ComUtil';
import autoTable from 'jspdf-autotable';
import { toPDF } from '../../utils/dbConnect';
import { PrintBtn } from '../comUtil/ComUtil';
import ReactPaginate from 'react-paginate';
import { Button } from '@chakra-ui/button';

export default function ShowArchSells({ sellArch }) {
	if (sellArch.sell.length < 1) return <Title title='لا توجد بيانات للعرض' />;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(sellArch.sell.length);
	const [text, setText] = useState('الفواتير الحالية:');
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
		const results = sellArch.sell.filter((e) => {
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
	}, [searchTerm, sellArch.sell]);

	const clear = () => {
		setText('الفواتير الحالية:');
		setSearchTerm('');
		setCarLength(sellArch.sell.length);
		setSearchResults(
			sellArch.sell.sort((a, b) => (a.sell_date < b.sell_date ? 1 : -1))
		);
		inputReference.current.focus();
	};

	const searchByDate = (search) => {
		const results = sellArch.sell.filter((sell) => {
			return moment(sell.sell_date.toString()).isSame(moment(), search);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.sell_date < b.sell_date ? 1 : -1))
		);
		if (search === 'week') setText('فواتير الأسبوع الحالي:');
		if (search === 'month') setText('فواتير الشهر الحالي:');
		if (search === 'year') setText('فواتير السنة الحالية:');
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

		return toPDF(rows, columns, 'أرشيف الدخل اليومي');
	}

	return (
		<>
			<Title title='أرشيف الدخل اليومي' />
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
						click={() => searchByDate('year')}
						title={'فواتير السنة الحالية'}
					/>
					<Btn
						click={() => searchByDate('month')}
						title={'فواتير الشهر الحالي'}
					/>
					<Btn
						click={() => searchByDate('week')}
						title={'فواتير الأسبوع الحالي'}
					/>
					<Btn click={() => clear()} title={'عرض الجميع'} />
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
												router.push(
													`http://localhost:3000/${car._id}/archSellEdit`
												)
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
