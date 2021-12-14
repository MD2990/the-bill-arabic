import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/layout';
import { ChevronDownIcon } from '@chakra-ui/icons';

import Link from 'next/link';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const MenuItems = ({ children }) => (
	<Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
		{children}
	</Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Nav = (props) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);

	return (
		<Flex
			className='wr mdText'
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			padding='1.5rem'
			bg='teal.500'
			color='white'
			{...props}>
			<Flex align='center' mr={5}>
				<Link href='/'>
					<a>
						<h1 className='lgFont'>
							المدرار <i className='fas fa-cart-arrow-down fa-xs'></i>
						</h1>
					</a>
				</Link>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<span className='fas fa-bars fa-sm'></span>
			</Box>

			<Box
				className='text-black-50  '
				display={{ sm: show ? 'block' : 'none', md: 'flex' }}
				width={{ sm: 'full', md: 'auto' }}
				alignItems='center'
				flexGrow={1}>
				<Menu>
					<MenuButton
						as={Button}
						colorScheme='teal'
						leftIcon={<ChevronDownIcon />}
						fontSize='larger'
						mr={2}>
						الفواتير{' '}
					</MenuButton>
					<MenuList>
						<Link href='/addNewBillPage'>
							<a>
								<MenuItem> إضافة فاتورة جديدة</MenuItem>
							</a>
						</Link>
						<Link href='/showBillPage'>
							<a>
								<MenuItem>عرض الفواتير</MenuItem>
							</a>
						</Link>
					</MenuList>
				</Menu>

				<Menu>
					<MenuButton
						as={Button}
						colorScheme='teal'
						leftIcon={<ChevronDownIcon />}
						fontSize='larger'
						mr={2}>
						الدخل اليومي
					</MenuButton>
					<MenuList>
						<Link href='/addNewSellPage'>
							<a>
								<MenuItem> إضافة الدخل اليومي</MenuItem>
							</a>
						</Link>
						<Link href='/showSellPage'>
							<a>
								<MenuItem>عرض الدخل اليومي</MenuItem>
							</a>
						</Link>
					</MenuList>
				</Menu>

				<Menu>
					<MenuButton
						as={Button}
						colorScheme='teal'
						leftIcon={<ChevronDownIcon />}
						fontSize='larger'
						mr={2}>
						المصروفات{' '}
					</MenuButton>
					<MenuList>
						<Link href='/expAdd'>
							<a>
								<MenuItem>إضافة مصروفات</MenuItem>
							</a>
						</Link>
						<Link href='/exp'>
							<a>
								<MenuItem>عرض المصروفات</MenuItem>
							</a>
						</Link>
					</MenuList>
				</Menu>

				<Menu>
					<MenuButton
						as={Button}
						colorScheme='teal'
						leftIcon={<ChevronDownIcon />}
						fontSize='larger'
						mr={2}>
						بيانات الموظفين{' '}
					</MenuButton>
					<MenuList>
						<Link href='/empAdd'>
							<a>
								<MenuItem> إضافة موظف جديد</MenuItem>
							</a>
						</Link>
						<Link href='/emp'>
							<a>
								<MenuItem>عرض بيانات الموظفين</MenuItem>
							</a>
						</Link>
						<Link href='/showAllSal'>
							<a>
								<MenuItem>عرض جميع الرواتب</MenuItem>
							</a>
						</Link>
					</MenuList>
				</Menu>

				<Menu>
					<MenuButton
						as={Button}
						colorScheme='teal'
						leftIcon={<ChevronDownIcon />}
						fontSize='larger'
						mr={2}>
						الأرشيف
					</MenuButton>
					<MenuList>
						<Link href='/sellArchPage'>
							<a className=' font-weight-normal  text-decoration-none'>
								<MenuItem>أرشيف الدخل اليومي</MenuItem>
							</a>
						</Link>
						<Link href='/billArchPage'>
							<a className=' font-weight-normal  text-decoration-none'>
								<MenuItem>أرشيف الفواتير</MenuItem>
							</a>
						</Link>
					</MenuList>
				</Menu>

				<Menu></Menu>
			</Box>
		</Flex>
	);
};

export default Nav;
