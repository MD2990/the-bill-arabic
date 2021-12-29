import { HStack, Input, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react'
import { FcCalendar, FcFilledFilter } from 'react-icons/fc';
import { useSnapshot } from 'valtio';
import { Btn } from '../components/comUtil/ComUtil';
import state from '../stor';

export default function DateFilterUI({
  color,
  getCurrentMonth,
  getLastMonth,
  getLast3Month,
  getCurrentYear,
  getDateFromTo,
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
      <details
        style={{ cursor: "pointer", fontWeight: "bold", color: "darkgrey" }}
      >
        <summary>تصفية الفواتير</summary>
        <Wrap>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"فواتير الشهر الحالي"}
              click={getCurrentMonth}
            />
          </WrapItem>

          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"فواتير الشهر الماضي"}
              click={getLastMonth}
            />
          </WrapItem>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"فواتير آخر 3 أشهر"}
              click={getLast3Month}
            />
          </WrapItem>
          <WrapItem>
            <Btn
              color={color}
              icon={<FcCalendar />}
              title={"فواتير السنة الحالية"}
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
        </Wrap>
      </details>
    </HStack>
  );
}
