import dbConnect from '../../../utils/dbConnect';
import DailySellArch from '../../../models/DailySellArch';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const sell = await DailySellArch.findById(id);
				if (!sell) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ sell });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const sell = await DailySellArch.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!sell) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: sell });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const sell = await DailySellArch.deleteOne({ _id: id });
				if (!sell) {
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
