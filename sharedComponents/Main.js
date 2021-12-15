import 'bootstrap/dist/css/bootstrap.min.css';
import { FcElectricalSensor } from 'react-icons/fc';
import {
	Text,
	VStack,
} from '@chakra-ui/layout';
import { Center, Button } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';

import {
	FcCollect,
	FcDataConfiguration,
	FcMindMap,
	FcParallelTasks,
	FcBrokenLink,
	FcWorkflow,
} from 'react-icons/fc';
import { useRouter } from 'next/router';

export default function Main() {
	const router = useRouter();

	const Btn = ({ children, text, onClick, disabled = false }) => (
		<Button
			disabled={disabled}
			px='4'
			className='hvr-wobble-bottom'
			fontFamily='serif'
			fontSize='3xl'
			leftIcon={children}
			colorScheme='linkedin'
			variant='ghost'
			size='lg'
			onClick={onClick}>
			{text}
		</Button>
	);
	return (
		<>
			<Center>
				<Wrap spacing='44' justify='center' className='bg'>
					<WrapItem>
						<div className='card theBody '>
							<div className='Box  ml-n2'>
								<Center>
									<FcElectricalSensor
										size={'15em'}
										className='marginCardTop text-center'
									/>
								</Center>
							</div>

							<div className='details mt-lg-2 '>
								<Text
									fontFamily='serif'
									fontSize='2xl'
									textAlign='center'
									color='blackAlpha.600'
									fontWeight='extrabold'>
									Transmission Devices
								</Text>

								<VStack align='flex-start' mt='2' spacing='4' justify>
									<Btn
										text='CX Devices'
										onClick={() => router.push('/trans/cx/devices')}>
										<FcCollect />
									</Btn>
									<Btn
										text='DWDM'
										onClick={() => console.log('hi')}
										disabled={true}>
										<FcMindMap />
									</Btn>
									<Btn
										text='ODF'
										onClick={() => console.log('hi')}
										disabled={true}>
										<FcElectricalSensor />
									</Btn>
								</VStack>
							</div>
						</div>
					</WrapItem>

					<WrapItem>
						<div className='card theBody'>
							<div className='Box ml-n2'>
								<Center>
									<FcWorkflow size={'15em'} className='marginCardTop' />
								</Center>
							</div>

							<div className='details mt-lg-2'>
								<Text fontFamily='serif' fontSize='2xl' textAlign='center'>
									Network Devices
								</Text>
								<Button
									disabled
									fontFamily='serif'
									fontSize='3xl'
									leftIcon={<FcParallelTasks />}
									colorScheme='linkedin'
									variant='ghost'
									size='lg'
									margin='4'
									width='230px'
									onClick={() => router.push('#')}>
									SWITCHES
								</Button>
								<Button
									disabled
									fontFamily='serif'
									fontSize='3xl'
									leftIcon={<FcBrokenLink />}
									colorScheme='linkedin'
									variant='ghost'
									size='lg'
									margin='4'
									width='230px'
									onClick={() => router.push('#')}>
									FIREWALLS
								</Button>{' '}
								<Button
									disabled
									fontFamily='serif'
									fontSize='3xl'
									leftIcon={<FcDataConfiguration />}
									colorScheme='linkedin'
									variant='ghost'
									size='lg'
									margin='4'
									width='230px'
									onClick={() => router.push('#')}>
									SERVERS
								</Button>
							</div>
						</div>
					</WrapItem>
				</Wrap>
			</Center>
		</>
	);
}
