import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn } from "../comUtil/ComUtil";
import state from "../../stor";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../../sharedComponents/TotalText";
import { BackButton } from "../../sharedComponents/BackButton";
import SearchInput from "../../sharedComponents/SearchInput";

export const BillButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
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
    </Wrap>
  );
};
