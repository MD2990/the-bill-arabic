import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ data }) {
	const [currentPage, setCurrentPage] = useState(0);

	const PER_PAGE = 2;
	const offset = currentPage * PER_PAGE;
	data.slice(offset, offset + PER_PAGE);

	const pageCount = Math.ceil(data.length / PER_PAGE);

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	return (
		<>
			<div className='App'>
				<ReactPaginate
					previousLabel={'← Previous'}
					nextLabel={'Next →'}
					pageCount={pageCount}
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					previousLinkClassName={'pagination__link'}
					nextLinkClassName={'pagination__link'}
					disabledClassName={'pagination__link--disabled'}
					activeClassName={'pagination__link--active'}
				/>
			</div>
		</>
	);
}
