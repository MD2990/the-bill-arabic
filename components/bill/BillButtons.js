import { AddIcon, CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem, Divider, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn, Title } from "../comUtil/ComUtil";
import state from "../../stor";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../../sharedComponents/TotalText";
import { BackButton } from "../../sharedComponents/BackButton";
import SearchInput from "../../sharedComponents/SearchInput";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import { cutString } from "../../lib/funcs";
import BillDateFilter from "./BillDateFilter";

export const BillButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
    state.isFiltered = false;
    state.searchResults = snap.bill;
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
      `${snap.title}                          العدد:${rows.length} `
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
        <SearchInput data={snap.bill} />
      </WrapItem>
      <WrapItem>
        <Btn color="green.400"  icon={<RepeatIcon />} click={() => clear()} title="عرض الجميع" />
      </WrapItem>
      <WrapItem>
        <Btn
          color="green.400"
          icon={<AddIcon />}
          click={() => router.push("/addNewBillPage")}
          title="إضافة"
          />
      </WrapItem>

      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={() => printPdf()}  color={'green.200'} />
        </WrapItem>
      )}

      <WrapItem>
        <TotalText
          text={`الإجمالي:  ${snap.bill && snap.searchResults.length}`}
          />
      </WrapItem>


      {snap.searchResults.length < 1 && (
        <>
          <Divider />

          <Title title="لا توجد نتائج للعرض ..."></Title>
        </>
      )}
    </Wrap>
      <BillDateFilter/> 
      </>
  );
};
