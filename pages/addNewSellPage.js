import React from 'react';
import { Hd } from '../components/comUtil/ComUtil';
import AddSell from '../components/sell/AddSell';

export default function addNewSellPage() {
	return (
		<>
			<Hd title='إضافة دخل يومي' />
			<AddSell />
		</>
	);
}
