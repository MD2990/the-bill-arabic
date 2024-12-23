import {
	Box,
	Collapsible,
	Flex,
	Icon,
	IconButton,
	Link as LN,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
	FaCar,
	FaChevronCircleRight,
	FaExternalLinkAlt,
	FaHamburger,
	FaPlus,
	FaWindowClose,
} from "react-icons/fa";

export default function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<Flex minH={"80px"} p={[2, 4, 8, 10]} align={"center"}>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<FaWindowClose w={3} h={3} />
							) : (
								<FaHamburger w={5} h={5} />
							)
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "center" }}
					className="btn"
				>
					<Box
						py={[2, 3, 4, 5]}
						fontSize={["3xl", "5xl", "7xl", "8xl", "9xl"]}
						className="rotate"
						color="blue.600"
					>
						<Link href="/">
							<a>
								<FaCar />
							</a>
						</Link>
					</Box>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}
				>
					{/*	<Button
						as={'a'}
						fontSize={'sm'}
						fontWeight={400}
						variant={'link'}
						href={'#'}>
						Sign In
					</Button>
					<Button
						display={{ base: 'none', md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'pink.400'}
						href={'#'}
						_hover={{
							bg: 'pink.300',
						}}>
						Sign Up
					</Button>*/}
				</Stack>
			</Flex>

			<Collapsible.Root in={isOpen} animateOpacity>
				<MobileNav />
			</Collapsible.Root>
		</Box>
	);
}

const DesktopNav = () => {
	const linkHoverColor = "teal.300";
	const popoverContentBgColor = "white";

	return (
		<Stack
			align={"center"}
			direction={"row"}
			spacing={[4, 6, 8, 10]}
			zIndex="dropdown"
			mr="8"
		>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover id={navItem.label} trigger={"hover"} placement={"top-end"}>
						<PopoverTrigger>
							<LN
								cursor={!navItem.children ? "pointer" : "default"}
								p={2}
								href={navItem.href ?? "#"}
								fontSize={["md", "lg", "2xl", "4xl"]}
								fontWeight={700}
								color="blue.700"
								_hover={{
									color: linkHoverColor,
									boxShadow: "none",
								}}
							>
								{navItem.label}
							</LN>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								color="blue.500"
								fontSize={["sm", "md", "lg", "2xl"]}
								fontWeight="black"
								border={0}
								boxShadow={"xl"}
								textShadow={"0px 0px 5px rgba(0, 0, 0, 0.45)"}
								bg={popoverContentBgColor}
								p={2}
								rounded={"xl"}
								w={"auto"}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child}>
											{child.icon}
										</DesktopSubNav>
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, children }) => {
	return (
		<LN
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: "blue.50" }}
		>
			<Link href={href} passHref>
				<Stack direction={"row"} align={"center"}>
					{children}
					<Box>
						<Text
							transition={"all .3s ease"}
							_groupHover={{ color: "blue.600" }}
							fontWeight={500}
						>
							{label}
						</Text>
					</Box>
					<Flex
						transition={"all .3s ease"}
						transform={"translateX(-10px)"}
						opacity={0}
						_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
						justify={"flex-end"}
						align={"center"}
						flex={1}
					>
						<Icon color={"blue.200"} w={5} h={5} as={FaChevronCircleRight} />
					</Flex>
				</Stack>
			</Link>
		</LN>
	);
};

const MobileNav = () => {
	return (
		<Stack p={4} display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				cursor={children ? "default" : "pointer"}
				py={2}
				as={LN}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
					transition: "all .3s  ease",
					transform: "translateX(12px)",
					bg: "blue.50",
					borderRadius: "md",
					px: 2,
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.500", "gray.200")}
				>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapsible.Root
				in={isOpen}
				animateOpacity
				style={{ marginTop: "0!important" }}
			>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}
				>
					{children &&
						children.map((child) => (
							<LN key={child.label} py={2} href={child.href}>
								{child.label}
							</LN>
						))}
				</Stack>
			</Collapsible.Root>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: "الفواتير",
		children: [
			{
				label: "إضافة ",
				icon: <FaPlus color="blue.300" w="5" h="5" />,
				href: "/addNewBillPage",
			},
			{
				label: "عرض",
				href: "/showBillPage",
				icon: <FaExternalLinkAlt color="blue.300" w="5" h="5" />,
			},
		],
	},

	{
		label: "المصاريف",
		children: [
			{
				label: "إضافة ",
				icon: <FaPlus color="blue.300" w="5" h="5" />,
				href: "/addNewExpPage",
			},
			{
				label: "عرض",
				href: "/showExpPage",
				icon: <FaExternalLinkAlt color="blue.300" w="5" h="5" />,
			},
		],
	},
	{
		label: "الموظفين",
		children: [
			{
				label: "إضافة ",
				icon: <FaPlus color="blue.300" w="5" h="5" />,
				href: "/addNewEmpPage",
			},
			{
				label: "عرض",
				href: "/showEmpPage",
				icon: <FaExternalLinkAlt color="blue.300" w="5" h="5" />,
			},
		],
	},

	{
		label: "جميع الرواتب",
		href: "/showAllSalPage",
		icon: <FaPlus color="blue.300" w="5" h="5" />,
	},
];
