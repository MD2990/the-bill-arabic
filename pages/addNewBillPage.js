import React from 'react';
import AddBill from '../components/bill/AddBill';
import { Hd } from '../components/comUtil/ComUtil';

export default function addNewBillPage({title}) {
	return (
		<>
			<Hd title={title} />
			<AddBill />
		</>
	);
}


export async function getStaticProps() {
  return {
    props: { title: "إضافة فاتورة" },
  };
}
