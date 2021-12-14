import React from 'react';
import { Button } from '@chakra-ui/react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<nav>
				<ul className='pagination wr'>
					{pageNumbers.map((number) => {
						return (
							<li key={number} className='pagination mt-2  lead '>
								<Button
									variant={'solid'}
									colorScheme={'twitter'}
									onClick={() => paginate(number)}
									isActive={number == currentPage ? true : false}
									mr={2}>
									{number}
								</Button>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};

export default Pagination;
