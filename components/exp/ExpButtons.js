import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem, Divider } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn, Title } from "../comUtil/ComUtil";
import state from "../../stor";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../../sharedComponents/TotalText";
import { BackButton } from "../../sharedComponents/BackButton";
import SearchInput from "../../sharedComponents/SearchInput";

import { cutString } from "../../lib/funcs";
import ExpDateFilter from "./ExpDateFilter";
import { colors } from "../../lib/validationSchemas";

export const ExpButtons = () => {
	const snap = useSnapshot(state);

	const router = useRouter();

	const clear = () => {
		state.searchTerm = "";
		state.isFiltered = false;
		state.searchResults = snap.exp;
		state.title = "المصروفات";
	};

	function printPdf() {
		const rows = snap.searchResults.map(
			(
				{
					elc,
					rent,
					g_exp,
					workPrice,
					other_exp,
					total_profit,
					total_loss,
					added_date,
					remarks,
					_id,
				},
				index
			) => {
				index += 1;
				const data = {
					elc,
					rent,
					g_exp,
					workPrice,
					other_exp,
					total_profit,
					total_loss,
					added_date,
					remarks,
					id: cutString(_id, 18, 24),
					index,
				};

				return data;
			}
		);

		// const id = cutString(rows._id, 18, 24);

		const columns = [
			{ title: "الملاحظات", key: "remarks" },
			{ title: "االتاريخ", key: "added_date" },
			{ title: "إجمالي الخسارة", key: "total_loss" },
			{ title: "إجمالي الربح", key: "total_profit" },
			{ title: "مصروفات أخرى", key: "other_exp" },
			{ title: "مصروفات الكراج", key: "g_exp" },
			{ title: "الإيجار", key: "rent" },
			{ title: "الكهرباء", key: "elc" },
			{ title: "قيمة الخدمة", key: "workPrice" },
			{ title: "الرمز", key: "id" },
			{ title: "ت", key: "index" },
		];

		return toPDF(
			rows,
			columns,
			` ${snap.title}                                    العدد:${rows.length}                       `,
			"l"
		);
	}

	return (
		<>
			<Wrap
				spacing="4"
				justify="center"
				align="center"
				m="2"
				p="2"
				direction="row-reverse"
			>
				<WrapItem>
					<BackButton ml="0" />
				</WrapItem>
				<WrapItem>
					<SearchInput data={snap.exp} />
				</WrapItem>
				<WrapItem>
					<Btn
						color={colors.expDark}
						icon={<RepeatIcon />}
						click={() => clear()}
						title="عرض الجميع"
					/>
				</WrapItem>
				<WrapItem>
					<Btn
						color={colors.expDark}
						icon={<AddIcon />}
						click={() => router.push("/addNewExpPage")}
						title="إضافة"
					/>
				</WrapItem>

				{snap.searchResults.length > 0 && (
					<WrapItem>
						<PrintBtn click={() => printPdf()} color={colors.expLight} />
					</WrapItem>
				)}

				<WrapItem>
					<TotalText
						color={colors.expDark}
						text={`الإجمالي:  ${snap.exp && snap.searchResults.length}`}
					/>
				</WrapItem>

				{snap.searchResults.length < 1 && (
					<>
						<Divider />

						<Title
							title="لا توجد نتائج للعرض ..."
							color={colors.expDark}
						></Title>
					</>
				)}
			</Wrap>
			<ExpDateFilter />
		</>
	);
};
