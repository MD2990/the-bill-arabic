import React, { useEffect } from "react";
import ShowBills from "../components/bill/ShowBills";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Bill from "../models/Bill";
import { Btn, Hd, Title } from "../components/comUtil/ComUtil";
import state from "../stor";
import { Center } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { colors } from "../lib/validationSchemas";
import { useSnapshot } from "valtio";
import MySkeletons from "../sharedComponents/MySkeletons";

export default function ShowBillPage({ bills }) {
	const router = useRouter();

	const snap = useSnapshot(state);

	useEffect(() => {
		state.bill = bills.sort((a, b) => (a.bill_date < b.bill_date ? 1 : -1));
	}, [bills]);

	if (!bills) return <MySkeletons />;

	if (!state.bill) {
		return (
			<Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
		);
	}

	if (state.bill?.length < 1)
		return (
			<>
				<Hd title=" الفواتير" />

				<Title
					title="لم يتم إضافة فواتير إلى الآن ..."
					color={colors.billLight}
				></Title>
				<Center my={["1%", "2%", "3%", "4%"]}>
					<Btn
						fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
						p={["1rem", "1.5rem", "2rem", "2.5rem"]}
						click={() => router.replace(`/addNewBillPage`)}
						title="  إضافة فاتورة جديدة"
						icon={<AddIcon />}
						color="orange.300"
					></Btn>
				</Center>
			</>
		);
	return (
		<>
			<Hd title="الفواتير" />
			<ShowBills />
		</>
	);
}
export const getStaticProps = async () => {
	await dbConnect();
	const data = await Bill.find({});
	if (!data) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const bills = await jsonify(data);

	return {
		props: {
			bills,
		},
		revalidate: 1,
	};
};
