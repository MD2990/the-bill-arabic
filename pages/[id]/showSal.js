import useSWR from 'swr';
import Show from '../../components/sal/Show';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import Sal from '../../models/Sal';
import { useRouter } from 'next/router';
import { Hd, Spans } from '../../components/comUtil/ComUtil';
import { Button, Center } from '@chakra-ui/react';

export default function showSal({ sal }) {
	const router = useRouter();
	if (router.isFallback) {
		return <Spans />;
	}
	const { id } = router.query;

	if (sal.length < 1)
		return (
			<Center>
				<Button
					variant='outline'
					colorScheme='teal'
					size='lg'
					fontSize='5xl'
					padding='10'
					margin='32'
					onClick={() => router.replace(`/${id}/empAddSal`)}>
					إضافة راتب
				</Button>
			</Center>
		);

	return (
		<>
			<Hd title={`إضافة راتب للموظف`} />
			<Show sal={sal} />
		</>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await Sal.find({ emp_id: params.id });

	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const sal = await jsonify(data);

	return {
		props: {
			sal,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await Sal.find({});
	const sal = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = sal.map((c) => ({
		params: { id: c.emp_id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}
