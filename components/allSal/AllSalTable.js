import React, { useCallback, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { handleFormDelete } from '../../lib/funcs';
import { MyTable } from '../../sharedComponents/MyTable';
import state from '../../stor';

export default function AllSalTable() {


    const snap= useSnapshot(state);

    
  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);


  return < MyTable data={rs}  tableTitle={'عرض جميع الرواتب'} allSal/>;
}
