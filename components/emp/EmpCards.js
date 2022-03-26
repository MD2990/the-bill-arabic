import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import MySkeletons from "../../sharedComponents/MySkeletons";

import state from "../../stor";
import { MyTable } from "../../sharedComponents/MyTable";

export default function EmpTable() {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.emp) return <MySkeletons />;

  return <MyTable data={rs} emp tableTitle="بيانات الموظفين" />;
}
