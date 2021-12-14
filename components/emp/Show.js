import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { toPDF } from '../../utils/dbConnect';
import autoTable from 'jspdf-autotable';
import ReactPaginate from 'react-paginate';
import { Center, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Btn, PrintBtn, Title } from '../comUtil/ComUtil';
export default function Show({ emp }) {
	if (emp.emp.length < 1) return <Title title='لا توجد بيانات للعرض' />;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [carLength, setCarLength] = useState(emp.emp.length);
	const [text, setText] = useState('عدد الموظفين:');
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
		const results = emp.emp.filter((e) => {
			return Object.keys(e).some((key) =>
				e[key]
					.toString()
					.toLowerCase()
					.includes(searchTerm.toString().toLowerCase())
			);
		});
		setCarLength(results.length);
		setSearchResults(
			results.sort((a, b) => (a.empl_Date < b.empl_Date ? 1 : -1))
		);
	}, [searchTerm, emp.emp]);

	const clear = () => {
		setText('عدد الموظفين:');
		setSearchTerm('');

		inputReference.current.focus();
	};

	function printPdf() {
		let count = 0;
		const rows = [];
		searchResults.map((item) => {
			count++;
			rows.push({
				name: item.emp_name.toString().toUpperCase(),
				civil_id: item.civil_id,
				passport_number: item.passport_number,
				empl_Date: item.empl_Date,
				notes: item.notes,
				len: count,
			});
			return rows;
		});
		count = 0;
		const columns = [
			{ title: 'الملاحظات', key: 'notes' },
			{ title: 'تاريخ التعيين', key: 'empl_Date' },
			{ title: 'رفم الجواز', key: 'passport_number' },
			{ title: 'رقم البطاقة', key: 'civil_id' },
			{ title: 'اسم الموظف', key: 'name' },
			{ title: '#', key: 'len' },
		];

		return toPDF(rows, columns, 'بيانات الموظفين');
	}
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<Container>
				<Title title='بيانات الموظفين' />
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
						click={() => router.push('/empAdd')}
						title={'إضافة موظف'}
						color={'whatsapp'}
					/>
					<Btn click={() => clear()} title={'عرض الجميع'} color={'facebook'} />
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
						spacing='15px'
						className=' wr mt-4 text-right'>
						{rs.map((ex) => {
							return (
								<Card key={ex._id} className='mt-4 ml-4 mb-4 mr-4 '>
									<Card.Body className={'wr'}>
										<Card.Title className='font-weight-bolder '>
											<span className='text-muted text-info'>اسم الموظف:</span>{' '}
											{ex.emp_name}
										</Card.Title>
										<Card.Text className='mb-1'>
											<span className='text-muted text-info h5'>
												رقم البطاقة:
											</span>{' '}
											{ex.civil_id}
										</Card.Text>
										<Card.Text>
											<span className='text-muted text-info h5'>الوظيفة:</span>{' '}
											{ex.job}
										</Card.Text>
										<Card.Text className='mb-1'>
											<span className='text-muted text-info h5'>
												رقم الجواز:
											</span>{' '}
											{ex.passport_number}
										</Card.Text>
										<Card.Text className='mb-1'>
											<span className='text-muted text-info h5'>
												تاريخ التعيين:
											</span>{' '}
											{ex.empl_Date}
										</Card.Text>

										<Card.Text className='mb-1'>
											<span className='text-muted text-info h5'>
												الملاحظات:
											</span>{' '}
											{ex.notes.length > 15
												? `${ex.notes.substring(0, 17)} ...`
												: ex.notes}
										</Card.Text>
									</Card.Body>
									<Card.Footer className='wr'>
										<Wrap spacing='2px' align='center'>
											<WrapItem>
												<Link href={`/${ex._id}/empEdit`}>
													<a className='text-decoration-none'>
														<Button
															size='sm'
															variant='outline'
															colorScheme='whatsapp'>
															تعديل البيانات
														</Button>
													</a>
												</Link>
											</WrapItem>
											<WrapItem>
												<Link href={`/${ex._id}/empAddSal`}>
													<a className='text-decoration-none'>
														<Button
															size='sm'
															variant='outline'
															colorScheme='blue'>
															إضافة راتب
														</Button>
													</a>
												</Link>
											</WrapItem>

											<WrapItem>
												<Link href={`/${ex._id}/showSal`}>
													<a className='text-decoration-none'>
														<Button
															size='sm'
															variant='outline'
															colorScheme='blue'>
															عرض الرواتب
														</Button>
													</a>
												</Link>
											</WrapItem>
										</Wrap>
									</Card.Footer>
								</Card>
							);
						})}
					</SimpleGrid>
				</Center>
			</Container>
		</>
	);
}
