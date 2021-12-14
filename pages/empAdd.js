import React from 'react';
import { Hd } from '../components/comUtil/ComUtil';
import Add from '../components/emp/Add';

export default function expAdd() {
	return (
		<>
			<Hd title='إضافة موظف جديد' />
			<Add />
		</>
	);
}
