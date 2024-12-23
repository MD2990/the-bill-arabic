const BILL_FIELDS = [
	{
		name: "date",
		label: "التاريخ",
		type: "data",
		defaultValue: "",
	},
	{
		name: "details",
		label: "التفاصيل",
		type: "text",
		defaultValue: "",
	},
	{
		name: "total",
		label: "المجموع",
		type: "number",
		defaultValue: 0,
	},
	{
		name: "advance",
		label: "المدفوع",
		type: "number",
		defaultValue: 0,
	},
	{
		name: "balance",
		label: "المتبقي",
		type: "number",
		defaultValue: 0,
	},
	{
		name: "remarks",
		label: "الملاحظات",
		type: "textArea",
		defaultValue: "",
	},
];

export default BILL_FIELDS;
