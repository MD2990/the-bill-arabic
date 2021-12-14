import React from 'react';
import AddBill from '../components/bill/AddBill';
import { Hd } from '../components/comUtil/ComUtil';

export default function addNewBillPage() {
	return (
		<>
			<Hd title='إضافة فاتورة' />
			<AddBill />
		</>
	);
}
