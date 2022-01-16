import { Box, HStack, Input, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FcCalendar, FcFilledFilter } from "react-icons/fc";
import { useSnapshot } from "valtio";
import { Btn } from "../components/comUtil/ComUtil";
import state from "../stor";

export default function DateFilterUI({
  showAllBtn = false,
  color,
  getCurrentMonth,
  getLastMonth,
  getLast3Month,
  getCurrentYear,
  getDateFromTo,
  getAllSalaries,
}) {
  const snap = useSnapshot(state);

  const handleChangeTo = (e) => {
    state.isFiltered = true;
    state.toDate = e.target.value;
  };
  const handleChangeFrom = (e) => {
    state.isFiltered = true;
    state.fromDate = e.target.value;
  };
  return (
    <HStack w="100%" p="2">
      <Box as="details" cursor={"pointer"} color={color} fontWeight={"bold"}>
        <Text as="summary" fontSize={["sm", "md", "lg", "xl"]}>
          تصفية النتائج
        </Text>

        <Wrap>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"الشهر الحالي"}
              click={getCurrentMonth}
            />
          </WrapItem>

          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"الشهر الماضي"}
              click={getLastMonth}
            />
          </WrapItem>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={" آخر 3 أشهر"}
              click={getLast3Month}
            />
          </WrapItem>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"السنة الحالية"}
              click={getCurrentYear}
            />
          </WrapItem>

          <WrapItem>
            <HStack>
              <Input
                type="date"
                defaultValue={snap.fromDate}
                onChange={handleChangeFrom}
              />
              <Text> إلى </Text>
              <Input
                type={"date"}
                defaultValue={snap.toDate}
                onChange={handleChangeTo}
              />

              <Btn
                color={color}
                icon={<FcFilledFilter />}
                title={"تطبيق"}
                click={getDateFromTo}
              />
            </HStack>
          </WrapItem>
         { showAllBtn && (
           <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"عرض الجميع"}
              click={getAllSalaries}
            />
          </WrapItem>)
         } 
        </Wrap>
      </Box>
    </HStack>
  );
}
