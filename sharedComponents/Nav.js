import { Link as LN } from '@chakra-ui/react';
import Link from 'next/link';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Stack,
	Collapse,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	AddIcon,
	ExternalLinkIcon,
	ViewIcon,
	
} from '@chakra-ui/icons';
import { ImHome } from "react-icons/im";

export default function WithSubnavigation() {
	const { isOpen, onToggle } = useDisclosure();

	return (
    <Box>
      <Flex
        className="theBody"
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            color={useColorModeValue("whiteAlpha.800", "white")}
          >
            <Link href="/">
              <a>
                <ImHome size="3rem" />
              </a>
            </Link>
          </Text>

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

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
	const linkHoverColor = useColorModeValue('teal.600', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.600');

	return (
    <Stack direction={"row"} spacing={4} mt="3" zIndex="dropdown">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <LN
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"xl"}
                fontWeight={700}
                color="whiteAlpha.900"
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </LN>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                color="teal.700"
                fontSize={"lg"}
                fontWeight="extrabold"
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={2}
                rounded={"xl"}
                w="12rem"
                minW={"6rem"}
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
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Link href={href} passHref>
        <Stack direction={"row"} align={"center"}>
          {children}
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "blue.400" }}
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
            <Icon color={"blue.200"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </LN>
  );
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.400')}
			p={4}
			display={{ md: 'none' }}>
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
				py={2}
				as={LN}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.500', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<LN key={child.label} py={2} href={child.href}>
								{child.label}
							</LN>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: 'CX Devices',
		children: [
			{
				label: 'Add New',
				icon: <AddIcon color='blue.300' w='5' h='5' />,
				href: '/trans/cx/devices/add',
			},
			{
				label: 'Show',
				href: '/trans/cx/devices',
				icon: <ExternalLinkIcon color='blue.300' w='5' h='5' />,
			},
		],
	},
	{
		label: 'Dark Fiber',
		href: '/trans/d_f/add',
		icon: <AddIcon color='blue.300' w='5' h='5' />,
	},
	{
		label: 'Maps',
		href: '/trans/maps/',
	},
	{
		label: 'Statistics',
		href: '/C/',
	},

	{
		label: 'Manage',
		children: [
			{
				label: 'Employees',
				icon: <ViewIcon color='blue.300' w='5' h='5' />,
				href: '/trans/emp',
			},
			/* 	{
				label: 'Show',
				href: '/trans/cx/devices',
				icon: <ExternalLinkIcon color='blue.300' w='5' h='5' />,
			}, */
		],
	},
];
