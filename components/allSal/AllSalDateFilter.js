import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/constants";
import { myFilter } from "../../lib/funcs";
import DateFilterUI from "../../sharedComponents/DateFilterUI";
import state from "../../stor";

export default function AllSalDateFilter() {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.isFiltered = false;
  }, [snap.isFiltered]);

  useEffect(() => {
    snap.isFiltered && getDateFromTo();
  }, [getDateFromTo, snap.fromDate, snap.isFiltered, snap.toDate]);

  function getCurrentMonth() {
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.title = `  رواتب شهر  ${moment().format("MM/YYYY")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date).isSame(moment(), "month");
    });
  }

  function getLast3Month() {
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.title = `رواتب آخر 3 أشهر من ${moment()
      .subtract(3, "M")
      .format("MM")} إلى ${moment().subtract(1, "M").format("MM")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date).isBetween(
        moment().subtract(4, "M"),
        moment(),
        "M"
      );
    });
  }
  function getLastMonth() {
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.title = ` الرواتب لشهر  ${moment()
      .subtract(1, "M")
      .format("MM/YYYY")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date).isBetween(
        moment().subtract(2, "M"),
        moment(),
        "M"
      );
    });
  }
  const getCurrentYear = () => {
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.title = `رواتب السنة الحالية ${moment().format("YYYY")}`;
    state.searchResults = state.searchResults.filter((b) => {
      return moment(b.salary_date).isSame(moment(), "Y");
    });
  };
  const getAllSalaries = () => {
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.title = "جميع الرواتب";
  };

  const getDateFromTo = useCallback(() => {
    state.title = `الرواتب من ${moment(snap.fromDate).format(
      "YYYY/MM/DD"
    )} إلى ${moment(snap.toDate).format("YYYY/MM/DD")}`;
    if (snap.isMonthFilter) {
      state.searchResults = myFilter({
        arr: state.allSal,
        searchTerm: state.searchTerm,
      });
    }
    state.isMonthFilter = true;
    state.searchResults = state.searchResults.filter((b) => {
      return b.salary_date >= snap.fromDate && b.salary_date <= snap.toDate;
    });
  }, [snap.fromDate, snap.isMonthFilter, snap.toDate]);

  return (
    <DateFilterUI
      color={colors.salLight}
      getCurrentMonth={getCurrentMonth}
      getLastMonth={getLastMonth}
      getLast3Month={getLast3Month}
      getCurrentYear={getCurrentYear}
      getDateFromTo={getDateFromTo}
      getAllSalaries={getAllSalaries}
      showAllBtn
    />
  );
}
