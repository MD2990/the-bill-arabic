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
import { cutString, getItem } from "../../lib/funcs";
import SalDateFilter from "./SalDateFilter";
import { colors } from "../../lib/constants";

export const SalButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
    state.title = " رواتب الموظف";
  };

  function printPdf() {
    const rows = snap.searchResults.map(
      (
        { _id, basic_salary, bonus, loans, total_salary, salary_date, remarks },
        index
      ) => {
        index += 1;
        const data = {
          basic_salary,

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
      { title: "الرمز", key: "id" },
      { title: "ت", key: "index" },
    ];

    return toPDF(
      rows,
      columns,
      `Quantity:  ${rows.length}          Emp.Name: ${
        snap.sal[0]?.emp_name.toUpperCase() || getItem("emp").toUpperCase()
      } `
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
        <SearchInput data={snap.sal} />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<RepeatIcon />}
          click={() => clear()}
          title="عرض الجميع"
          color={colors.salLight}
        />
      </WrapItem>
      <WrapItem>
        <Btn
          color={colors.salLight}
          icon={<AddIcon />}
          click={() => router.push(`/${getItem("id")}/addSalaryPage`)}
          title="إضافة"
        />
      </WrapItem>

      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={printPdf} color={colors.salDark} />
        </WrapItem>
      )}

      <WrapItem>
        <TotalText
          color={colors.salLight}
          text={`الإجمالي:  ${snap.sal && snap.searchResults.length}`}
        />
      </WrapItem>

      {snap.searchResults.length < 1 && (
        <>
          <Divider />

          <Title title="لا توجد نتائج للعرض ..."></Title>
        </>
      )}
      <SalDateFilter />
    </Wrap>
  );
};
