import { useRouter } from 'next/router';
import React from 'react';

import { Hd, Spans, Title } from '../../components/comUtil/ComUtil';
import AddSal from '../../components/sal/AddSal';
import { getItem } from '../../lib/funcs';
 
//Here we need {sal} to add a salary for specific employee
const AddSalaryPage = () => {
  const router = useRouter();
  const empName= getItem( 'emp');

  if (router.isFallback || !empName) {
    return <Spans />;
  }

  return (
    <>
      <Hd title={`إضافة راتب للموظف: ${empName||" . . ."}`} />
      <AddSal empName={empName}/>
    </>
  );
};



export default AddSalaryPage;
