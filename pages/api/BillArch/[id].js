import dbConnect from '../../../utils/dbConnect';
import BillArch from '../../../models/BillArch';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const bill = await BillArch.findById(id);
				if (!bill) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ data: bill });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const bill = await BillArch.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!bill) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: bill });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const billArch = await BillArch.deleteOne({ _id: id });
				if (!billArch) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
