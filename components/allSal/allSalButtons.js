import { AddIcon, CalendarIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem, Divider, Text, Box, HStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn, Title } from "../comUtil/ComUtil";
import state from "../../stor";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../../sharedComponents/TotalText";
import { BackButton } from "../../sharedComponents/BackButton";
import SearchInput from "../../sharedComponents/SearchInput";
import moment from "moment";
import { convertDate, cutString, getItem, today } from "../../lib/funcs";
import { Input } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export const SalButtons = ({ sal }) => {
  //create a function to get the date between tow dates

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const snap = useSnapshot(state);

  const router = useRouter();

     useEffect(() => {
    getDateFromTo();
  }, [getDateFromTo, from, to]); 

  const clear = () => {
    state.searchTerm = "";
    state.isFiltered = false;
    state.searchResults = snap.allSal;
    state.title = "رواتب جميع الموظفين";
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
      `تفاصيل الرواتب                              العدد ${rows.length} `
    );
  }

  function getCurrentMonth() {
    state.title = `رواتب الشهر الحالي ${moment().format("MMMM - MM/YYYY")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date.toString())
        .add(0, "months")
        .isSame(moment(), "month");
    });
  }
  function getLastMonth() {
    state.title = `رواتب الشهر الحالي ${moment().format("MMMM - MM/YYYY")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date.toString()).isSame(moment(), "month");
    });
  }

  const getDateFromTo = () => {
    // convert iso date to  date 
    const fromDate = moment(from).format("YYYY-MM-DD");
    const toDate = moment(to).format("YYYY-MM-DD");


    console.log(fromDate);
    console.log(toDate);
    // state.title = `رواتب الشهر الحالي ${moment().format("MMMM - MM/YYYY")}`;
    state.searchResults = snap.searchResults.filter((b) => {
      return b.salary_date >= fromDate && b.salary_date <= toDate;
    });
  };
  const handleChangeTo = (e) => {
    setTo(e.target.value);
    console.log("to");
  };
  const handleChangeFrom = (e) => {
    setFrom(e.target.value);
    console.log(" from");
  };
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
          <SearchInput data={snap.allSal} />
        </WrapItem>
        <WrapItem>
          <Btn icon={<RepeatIcon />} click={() => clear()} title="عرض الجميع" />
        </WrapItem>
        <WrapItem>
          <Btn
            color="green.400"
            icon={<AddIcon />}
            click={() => router.push(`/${getItem("id")}/addSalaryPage`)}
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
            text={`الإجمالي:  ${snap.allSal && snap.searchResults.length}`}
          />
        </WrapItem>

        {snap.searchResults.length < 1 && (
          <>
            <Divider />

            <Title title="لا توجد نتائج للعرض ..."></Title>
          </>
        )}
      </Wrap>

      <HStack w="100%" p="2">
        <details
          style={{ cursor: "pointer", fontWeight: "bold", color: "darkgrey" }}
        >
          <summary>تصفية الرواتب</summary>
          <Wrap>
            <WrapItem>
              <Btn
                color="blue.400"
                icon={<CalendarIcon />}
                title={"رواتب الشهر الحالي"}
                click={getCurrentMonth}
              />
            </WrapItem>

            <WrapItem>
              <Btn
                color="blue.400"
                icon={<CalendarIcon />}
                title={"رواتب الشهر الماضي"}
                click={getCurrentMonth}
              />
            </WrapItem>
            <WrapItem>
              <Btn
                color="blue.400"
                icon={<CalendarIcon />}
                title={"رواتب آخر 3 أشهر"}
                click={getCurrentMonth}
              />
            </WrapItem>
            <WrapItem>
              <Btn
                color="blue.400"
                icon={<CalendarIcon />}
                title={"رواتب السنة الحالية"}
                click={getCurrentMonth}
              />
            </WrapItem>

            <WrapItem>
              <HStack>
                <Text> from </Text>

                <DatePicker
                  selected={from}
                  onChange={(date) => setFrom(date)}
                  dateFormat="dd-MM-yyyy"
                />
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={to}
                  onChange={(date) => {
                    setTo(date);
                   
                  }}
                />

                <Text> to </Text>
                <Btn
                  color="blue.400"
                  icon={<CalendarIcon />}
                  title={"عرض"}
                  click={getDateFromTo}
                />
              </HStack>
            </WrapItem>
          </Wrap>
        </details>
      </HStack>
    </>
  );
};
