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
import { cutString, myFilter } from "../../lib/funcs";
import { colors } from "../../lib/constants";
import { useEffect } from "react";

export const EmpButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();
  const clear = () => {
    state.searchTerm = "";
  };

  function printPdf() {
    const rows = snap.searchResults.map(
      (
        {
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_date,
          added_date,
          remarks,
          _id,
        },
        index
      ) => {
        index += 1;
        const data = {
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_date,
          added_date,
          remarks,
          id: cutString(_id, 18, 24),
          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "الملاحظات", key: "remarks" },
      { title: "تاريخ الإضافة", key: "added_date" },
      { title: "تاريخ التعيين", key: "empl_date" },
      { title: "رقم الجواز", key: "passport_number" },
      { title: "رقم البطاقة", key: "civil_id" },
      { title: "الوظيفة", key: "job" },
      { title: "اسم الموظف", key: "emp_name" },
      { title: "الرمز", key: "id" },
      { title: "ت", key: "index" },
    ];

    return toPDF(
      rows,
      columns,
      `تفاصيل الموظفين                      العدد ${rows.length} `,
      "l"
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
        <SearchInput data={snap.emp} />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<RepeatIcon />}
          click={clear}
          title="عرض الجميع"
          color={colors.empLight}
        />
      </WrapItem>
      <WrapItem>
        <Btn
          color={colors.empLight}
          icon={<AddIcon />}
          click={() => router.push("/addNewEmpPage")}
          title="إضافة"
        />
      </WrapItem>

      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={printPdf} />
        </WrapItem>
      )}

      <WrapItem>
        <TotalText
          color={colors.empLight}
          text={`الإجمالي:  ${snap.searchResults.length || 0}`}
        />
      </WrapItem>

      {snap.searchResults.length < 1 && (
        <>
          <Divider />

          <Title
            title="لا توجد نتائج للعرض ..."
            color={colors.empLight}
          ></Title>
        </>
      )}
    </Wrap>
  );
};
