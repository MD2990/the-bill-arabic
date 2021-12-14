import dbConnect from '../../../utils/dbConnect';
import Bill from '../../../models/Bill';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const bill = await Bill.findById(id);
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
				const bill = await Bill.findByIdAndUpdate(id, req.body, {
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
				const bill = await Bill.deleteOne({ _id: id });
				if (!bill) {
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
