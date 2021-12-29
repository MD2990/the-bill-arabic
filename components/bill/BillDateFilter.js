import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import DateFilterUI from "../../sharedComponents/DateFilterUI";
import state from "../../stor";

export default function BillDateFilter() {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.isFiltered = false;
  }, [snap.isFiltered]);
  useEffect(() => {
    snap.isFiltered && getDateFromTo();
  }, [getDateFromTo, snap.fromDate, snap.isFiltered, snap.toDate]);

  function getCurrentMonth() {
    state.title = `فواتير الشهر الحالي ${moment().format("MM/YYYY")}`;
    state.searchResults = state.bill.filter((b) => {
      return moment(b.bill_date).isSame(moment(), "month");
    });
  }

  function getLast3Month() {
    state.title = `فواتير آخر 3 أشهر من ${moment()
      .subtract(3, "M")
      .format("MM")} إلى ${moment().subtract(1, "M").format("MM")}`;
    state.searchResults = state.bill.filter((b) => {
      return moment(b.bill_date).isBetween(
        moment().subtract(4, "M"),
        moment(),
        "M"
      );
    });
  }
  function getLastMonth() {
    state.title = ` الفواتير لشهر  ${moment()
      .subtract(1, "M")
      .format("MM/YYYY")}`;
    state.searchResults = state.bill.filter((b) => {
      return moment(b.bill_date).isBetween(
        moment().subtract(2, "M"),
        moment(),
        "M"
      );
    });
  }
  function getCurrentYear() {
    state.title = `فواتير السنة الحالية ${moment().format("YYYY")}`;
    state.searchResults = state.bill.filter((b) => {
      return moment(b.bill_date).isSame(moment(), "Y");
    });
  }

  const getDateFromTo = useCallback(() => {
    state.title = `الفواتير من ${moment(snap.fromDate).format(
      "YYYY/MM/DD"
    )} إلى ${moment(snap.toDate).format("YYYY/MM/DD")}`;

    state.searchResults = state.bill.filter((b) => {
      return b.bill_date >= snap.fromDate && b.bill_date <= snap.toDate;
    });
  }, [snap.fromDate, snap.toDate]);

  return (
    <DateFilterUI
      color="green.400"
      getCurrentMonth={getCurrentMonth}
      getLastMonth={getLastMonth}
      getLast3Month={getLast3Month}
      getCurrentYear={getCurrentYear}
      getDateFromTo={getDateFromTo}
    />
  );
}
