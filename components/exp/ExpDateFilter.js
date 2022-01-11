import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/constants";
import DateFilterUI from "../../sharedComponents/DateFilterUI";
import state from "../../stor";

export default function ExpDateFilter() {
  const snap = useSnapshot(state);
  const getDateFromTo = useCallback(() => {
    state.title = `الفواتير من ${moment(snap.fromDate).format(
      "YYYY/MM/DD"
    )} إلى ${moment(snap.toDate).format("YYYY/MM/DD")}`;

    state.searchResults = state.exp.filter((b) => {
      return b.added_date >= snap.fromDate && b.added_date <= snap.toDate;
    });
  }, [snap.fromDate, snap.toDate]);

  useEffect(() => {
    state.isFiltered = false;
  }, [snap.isFiltered]);
  useEffect(() => {
    snap.isFiltered && getDateFromTo();
  }, [getDateFromTo, snap.fromDate, snap.isFiltered, snap.toDate]);

  function getCurrentMonth() {
    state.title = `فواتير الشهر الحالي ${moment().format("YYYY/DD")}`;
    state.searchResults = state.exp.filter((b) => {
      return moment(b.added_date).isSame(moment(), "month");
    });
  }

  function getLast3Month() {
    state.title = `فواتير آخر 3 أشهر من ${moment()
      .subtract(3, "M")
      .format("MM")} إلى ${moment().subtract(1, "M").format("MM")}`;
    state.searchResults = state.exp.filter((b) => {
      return moment(b.added_date).isBetween(
        moment().subtract(4, "M"),
        moment(),
        "M"
      );
    });
  }
  function getLastMonth() {
    state.title = ` فواتير شهر  ${moment().subtract(1, "M").format("YYYY/MM")}`;
    state.searchResults = state.exp.filter((b) => {
      return moment(b.added_date).isBetween(
        moment().subtract(2, "M"),
        moment(),
        "M"
      );
    });
  }
  function getCurrentYear() {
    state.title = `فواتير السنة الحالية ${moment().format("YYYY")}`;
    state.searchResults = state.exp.filter((b) => {
      return moment(b.added_date).isSame(moment(), "Y");
    });
  }


  return (
    <DateFilterUI
      color={colors().expDark}
      getCurrentMonth={getCurrentMonth}
      getLastMonth={getLastMonth}
      getLast3Month={getLast3Month}
      getCurrentYear={getCurrentYear}
      getDateFromTo={getDateFromTo}
    />
  );
}
