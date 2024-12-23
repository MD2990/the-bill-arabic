import { RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem, Divider } from "@chakra-ui/layout";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn, Title } from "../comUtil/ComUtil";
import state from "../../stor";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../../sharedComponents/TotalText";
import { BackButton } from "../../sharedComponents/BackButton";
import SearchInput from "../../sharedComponents/SearchInput";
import { cutString } from "../../lib/funcs";
import AllSalDateFilter from "./AllSalDateFilter";
import { colors } from "../../lib/validationSchemas";
import { FcClearFilters } from "react-icons/fc";

export const SalButtons = () => {
	const snap = useSnapshot(state);

	const clear = () => {
		state.searchTerm = "";
		state.isFiltered = false;
		state.searchResults = snap.allSal;
		state.title = " جميع الرواتب";
	};

	function printPdf() {
		const rows = snap.searchResults.map(
			(
				{
					_id,
					emp_name,
					basic_salary,
					bonus,
					loans,
					total_salary,
					salary_date,
					remarks,
				},
				index
			) => {
				index += 1;
				const data = {
					basic_salary,
					emp_name: emp_name.toUpperCase(),
					bonus,
					loans,
					total_salary,
					salary_date,
					remarks,
					id: cutString(_id, 18, 24),
					index,
				};

				return data;
			}
		);

		const columns = [
			{ title: "الملاحظات", key: "remarks" },
			{ title: "تاريخ الاستلام", key: "salary_date" },
			{ title: "الراتب الاجمالي", key: "total_salary" },
			{ title: "القروض", key: "loans" },
			{ title: "العلاوات", key: "bonus" },
			{ title: "الراتب الأساسي", key: "basic_salary" },
			{ title: "الإسم", key: "emp_name" },
			{ title: "الرمز", key: "id" },
			{ title: "ت", key: "index" },
		];

		return toPDF(
			rows,
			columns,
			`${rows.length}                ${state.title}  ${state.subTitle}`
		);
	}

	return (
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
				<SearchInput data={snap.allSal} />
			</WrapItem>
			<WrapItem>
				<Btn
					color={colors.salDark}
					icon={<FcClearFilters />}
					click={() => clear()}
					title="عرض الجميع"
				/>
			</WrapItem>

			{snap.searchResults.length > 0 && (
				<WrapItem>
					<PrintBtn color={colors.salLight} click={() => printPdf()} />
				</WrapItem>
			)}

			<WrapItem>
				<TotalText
					color={colors.salDark}
					text={`الإجمالي:  ${snap.allSal && snap.searchResults.length}`}
				/>
			</WrapItem>

			{snap.searchResults.length < 1 && (
				<>
					<Divider />

					<Title
						title="لا توجد نتائج للعرض ..."
						color={colors.salLight}
					></Title>
				</>
			)}

			<AllSalDateFilter />
		</Wrap>
	);
};
