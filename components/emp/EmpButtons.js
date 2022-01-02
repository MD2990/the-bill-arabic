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
import { colors } from "../../lib/constants";

export const EmpButtons = () => {
  const snap = useSnapshot(state);
  

  

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
    state.isFiltered = false;
    state.searchResults = snap.emp;
   
  };

  function printPdf() {
    const rows = snap.searchResults.map(
      (
        { details, bill_date, advance, total_price, balance, remarks,_id },
        index
      ) => {
        index += 1;
        const data = {
      details, bill_date, advance, total_price, balance, remarks,id: cutString(_id, 18, 24),
          index,
        };

        return data;
      }
    );

 // const id = cutString(rows._id, 18, 24);
    const columns = [
      { title: "الملاحظات", key: "remarks" },
      { title: "تاريخ الفاتورة", key: "bill_date" },
      { title: "المبلغ المتبقي", key: "balance" },
      { title: "المبلغ المدفوع", key: "advance" },
      { title: "الإجمالي", key: "total_price" },
      { title: "تفاصيل الفاتورة", key: "details" },
      { title: "رقم الفاتورة", key: "id" },
      { title: "ت", key: "index" },
    ];

    return toPDF(
      rows,
      columns,
      `تفاصيل الفواتير                      العدد ${rows.length} `
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
          click={() => clear()}
          title="عرض الجميع"
          color={colors().empLight}
        />
      </WrapItem>
      <WrapItem>
        <Btn
          color={colors().empLight}
          icon={<AddIcon />}
          click={() => router.push("/addNewEmpPage")}
          title="إضافة"
        />
      </WrapItem>

      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={() => printPdf()} />
        </WrapItem>
      )}

      <WrapItem>
        <TotalText
          color={colors().empLight}
          text={`الإجمالي:  ${snap.emp && snap.searchResults.length}`}
        />
      </WrapItem>

      {snap.searchResults.length < 1 && (
        <>
          <Divider />

          <Title title="لا توجد نتائج للعرض ..." color={colors().empLight}  ></Title>
        </>
      )}
    </Wrap>
  );
};
