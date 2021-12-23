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
        {
          company_name,
          bill_number,
          bill_amount,
          bill_type,
          bill_date,
          check_date,
          payment_status,
          notes,
        },
        index
      ) => {
        index += 1;
        const data = {
          company_name,
          bill_number,
          bill_amount,
          bill_type,
          bill_date,
          check_date,
          notes,
          payment_status,
          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "#", key: "index" },
      { title: "Company Name", key: "company_name" },
      { title: "bill Number", key: "bill_number" },
      { title: "bill Amount", key: "bill_amount" },
      { title: "bill Type", key: "bill_type" },
      { title: "bill Date", key: "bill_date" },
      { title: "Check Date", key: "check_date" },
      { title: "Payment Status", key: "payment_status" },
      { title: "Remarks", key: "notes" },
    ];

    return toPDF(rows, columns, "bill Details");
  }

  function getCurrentMonth() {
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.bill_date.toString()).isSame(moment(), "month");
    });
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
        <SearchInput data={snap.bill} />
      </WrapItem>
      <WrapItem>
        <Btn icon={<RepeatIcon />} click={() => clear()} title="عرض الجميع" />
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
          <PrintBtn click={() => printPdf()} />
        </WrapItem>
      )}

      <WrapItem>
        <TotalText
          text={`الإجمالي:  ${snap.bill && snap.searchResults.length}`}
        />
      </WrapItem>

      <Btn
        color="blue.400"
        icon={<CalendarIcon />}
        title={"فواتير الشهر الحالي"}
        click={getCurrentMonth}
      />

      {snap.searchResults.length < 1 && (
        <>
          <Divider />

          <Title title="لا توجد نتائج للعرض ..."></Title>
        </>
      )}
    </Wrap>
  );
};
