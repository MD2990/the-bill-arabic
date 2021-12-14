import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import autoTable from 'jspdf-autotable';
import ReactPaginate from 'react-paginate';

import {
	Wrap,
	WrapItem,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react';

import { Center, SimpleGrid } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { toPDF } from '../../utils/dbConnect';
import { PrintBtn, Title, Btn } from '../comUtil/ComUtil';

export default function ShowAll({ sal }) {

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(sal.length);
	const [text, setText] = useState('عدد الرواتب الإجمالي:');
	const [monthNumber, setMonthNumber] = useState(1);
	const inputReference = useRef(null);
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
		setText(' عدد الرواتب الإجمالي:');
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
		const results = sal.sal.filter((e) => {
			return Object.keys(e).some((key) =>
				e[key]
					.toString()
					.trim()
					.toLowerCase()
					.includes(searchTerm.toString().trim().toLowerCase())
			);
		});

		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1))
		);
	}, [searchTerm, sal]); 

	const handleMonthChange = (event) => {
		setMonthNumber(event.target.value);
	};

	const clear = () => {
		setText(' عدد الرواتب الإجمالي:');
		setSearchTerm('');
		setSearchResults(
			sal.sal.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1))
		);

		setMonthNumber(1);

		//setSearchResults(sal.sal.sal);
		setCarLength(sal.sal.length);
		inputReference.current.focus();
	};

	const searchByTime = (time) => {
		const results = sal.sal.filter((s) =>
			moment(s.salary_date).isSame(moment(), time)
		);
		setSearchResults(
			results.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1))
		);

		setCarLength(results.length);

		if (time === 'year') setText('رواتب السنة الحالية:');
		if (time === 'month') setText('رواتب الشهر الحالي:');
	};

	const searchBySubtract = () => {
		const results = sal.sal.filter((s) =>
			moment(s.salary_date).isSame(
				moment().subtract(monthNumber, 'months'),
				'month'
			)
		);
		setSearchResults(
			results.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1))
		);

		setCarLength(results.length);
		setText(`قبل ${monthNumber} شهر عدد الرواتب  `);
	};

	function printPdf() {
		let count = 0;
		const rows = [];
		searchResults.map((item) => {
			count++;
			rows.push({
				name: item.emp_name.toString().toUpperCase(),
				basic: item.basic_salary,
				date: item.salary_date,
				bonus: item.bonus,
				loans: item.loans,
				total: item.total_salary,
				notes: item.sal_notes,
				len: count,
			});
		});
		count = 0;
		const columns = [
			{ title: 'الملاحظات', key: 'notes' },
			{ title: 'تاريخ الراتب', key: 'date' },
			{ title: 'إجمالي الراتب', key: 'total' },
			{ title: 'الراتب الأساسي', key: 'basic' },
			{ title: 'الخصميات', key: 'loans' },
			{ title: 'العلاوات', key: 'bonus' },
			{ title: 'اسم الموظف', key: 'name' },
			{ title: '#', key: 'len' },
		];

		return toPDF(rows, columns, ` تفاصيل رواتب الموظفين`);
	}

	return (
		<>
			<Container>
				<Title title={`جميع رواتب الموظفين `} />

				<h3 className='text-muted mt-md-5 mb-4 wr title'>
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
				</div>

				<Wrap spacing='5px' justify='center' className='wr'>
					<WrapItem>
						<Btn click={() => clear()} title='عرض الجميع' />
					</WrapItem>

					<WrapItem>
						<Btn
							click={() => searchByTime('month')}
							title='رواتب الشهر الحالي'
						/>
					</WrapItem>

					<WrapItem>
						<Btn
							click={() => searchBySubtract(monthNumber)}
							title={`الرواتب قبل ${monthNumber} شهر`}
						/>

						<NumberInput
							type='number'
							className='text-center '
							variant='flushed'
							value={monthNumber}
							size='md'
							step={1}
							precision={0}
							defaultValue={1}
							max={100}
							min={1}
							maxW={24}
							mt={2}>
							<NumberInputField
								value={monthNumber}
								onChange={handleMonthChange}
								fontSize={'x-large'}
								className='text-center font-weight-bolder '
								pl={2}
							/>
						</NumberInput>
					</WrapItem>

					<WrapItem>
						<Btn
							click={() => searchByTime('year')}
							title='رواتب السنة الحالية'
						/>
					</WrapItem>
					<WrapItem>
						{rs.length > 0 && <PrintBtn click={() => printPdf()} />}
					</WrapItem>
				</Wrap>
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
					columns={[2, null, 3]}
					spacing='15px'
					className=' wr mt-4 text-right'>
					{rs.map((e) => (
						<Card key={e._id} className='mt-4 ml-4 mb-4 mr-4 '>
							<Card.Body className={'wr'}>
								<Card.Title className='font-weight-bolder mb-4'>
									<span className='text-muted text-info h5-responsive'>
										اسم الموظف:
									</span>{' '}
									{e.emp_name}
								</Card.Title>
								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										الراتب الأساسي:
									</span>{' '}
									{e.basic_salary}
								</Card.Text>
								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										الخصميات:
									</span>{' '}
									{e.loans}
								</Card.Text>
								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										العلاوات:
									</span>{' '}
									{e.bonus}
								</Card.Text>

								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										إجمالي الراتب:
									</span>{' '}
									{e.total_salary}
								</Card.Text>
								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										تاريخ إستلام الراتب:
									</span>{' '}
									{e.salary_date}
								</Card.Text>

								<Card.Text className='mb-1'>
									<span className='text-muted text-info font-weight-bolder h5'>
										الملاحظات:
									</span>{' '}
									{e.sal_notes}
								</Card.Text>
							</Card.Body>
							<Card.Footer className='wr text-center'>
								<Link href={`/${e._id}/salEdit`}>
									<a >
										<Button variant='outline' colorScheme='teal' mr={4} size='lg'>
											تعديل الراتب
										</Button>
									</a>
								</Link>

							
							</Card.Footer>
						</Card>
					))}
				</SimpleGrid>
			</Center>
		</>
	);
}
