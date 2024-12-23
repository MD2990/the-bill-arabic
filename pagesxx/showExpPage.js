import useSWR from "swr";
import ShowExp from "../components/exp/ShowExp";
import { dbConnect, jsonify } from "../utils/dbConnect";
import Exp from "../models/Exp";
import { Btn, Hd, Title } from "../components/comUtil/ComUtil";
import { Center } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { colors } from "../lib/validationSchemas";
import { useEffect } from "react";
import state from "../stor";
import { useSnapshot } from "valtio";
import MySkeletons from "../sharedComponents/MySkeletons";

export default function ShowExpPage({ exp }) {
	const snap = useSnapshot(state);
	const router = useRouter();

	useEffect(() => {
		state.exp = exp.sort((a, b) => (a.added_date < b.added_date ? 1 : -1));
	}, [exp]);
	if (!exp)
		return (
			<Title title="حدث خطأ أثناء تحميل البيانات ، الرجاء المحاولة مرة أخرى" />
		);

	if (!state.exp) return <MySkeletons />;

	if (state.exp?.length < 1)
		return (
			<>
				<Hd title=" المصروفات" />

				<Title
					title="لم يتم إضافة مصروفات إلى الآن ..."
					color={colors.expLight}
				></Title>
				<Center my={["1%", "2%", "3%", "4%"]}>
					<Btn
						fontSize={["1rem", "1.5rem", "2rem", "2.5rem"]}
						p={["1rem", "1.5rem", "2rem", "2.5rem"]}
						click={() => router.replace(`/addNewExpPage`)}
						title="  إضافة مصروف جديد"
						icon={<AddIcon />}
						color={colors.expLight}
					></Btn>
				</Center>
			</>
		);

	return (
		<>
			<Hd title=" المصروفات" />

			<ShowExp />
		</>
	);
}
export async function getStaticProps() {
	await dbConnect();
	const data = await Exp.find({});
	if (!data) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const exp = await jsonify(data);

	return {
		props: {
			exp,
		},
		revalidate: 1,
	};
}
