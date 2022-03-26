import { useRouter } from 'next/router';
import React from 'react';

import { Hd } from '../../components/comUtil/ComUtil';
import AddSal from '../../components/sal/AddSal';
import { getItem } from '../../lib/funcs';
import MySkeletons from '../../sharedComponents/MySkeletons';
 
//Here we need {sal} to add a salary for specific employee
export default function AddSalaryPage () {
  const router = useRouter();
  const empName= getItem( 'emp');

  if (router.isFallback || !empName) {
    return <MySkeletons />;
  }

  return (
    <>
      <Hd title={`إضافة راتب للموظف: ${empName||" . . ."}`} />
      <AddSal empName={empName}/>
    </>
  );
};




