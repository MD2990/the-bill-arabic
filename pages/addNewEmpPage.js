import React from 'react';
import { Hd } from '../components/comUtil/ComUtil';
import AddEmp from '../components/emp/AddEmp';

export default function AddnewEmpPage() {
	return (
		<>
			<Hd title='إضافة موظف جديد' />
			<AddEmp />
		</>
	);
}
