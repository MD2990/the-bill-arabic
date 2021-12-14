import { useRouter } from 'next/router';
import React from 'react';
import { dbConnect, jsonify } from '../../utils/dbConnect';
import dailySellArch from '../../models/DailySellArch';
import Edit_Delete_Arch_Sell from '../../components/sell_arch/Edit_Delete_Arch_Sell';
import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';

const archSellEdit = ({ sell }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Spans />;
	}

	return (
		<>
			<Hd title='تحديث أرشيف بيانات الدخل اليومي' />
			<Edit_Delete_Arch_Sell sell={sell} />
		</>
	);
};

// This function gets called at build time
export async function getStaticProps({ params }) {
	dbConnect();
	const data = await dailySellArch.findById(params.id);
	const sell = await jsonify(data);
	if (!sell) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			sell,
		},
		revalidate: 1,
	};
}
export async function getStaticPaths() {
	dbConnect();
	const data = await dailySellArch.find({});
	const sell = await jsonify(data);

	// Get the paths we want to pre-render based on posts
	const paths = sell.map((c) => ({
		params: { id: c._id },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

export default archSellEdit;
