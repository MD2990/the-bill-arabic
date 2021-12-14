import dbConnect from '../../../utils/dbConnect';
import DailySell from '../../../models/DailySell';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const sell = await DailySell.findById(id);
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
				const sell = await DailySell.findByIdAndUpdate(id, req.body, {
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
				const deletedPet = await DailySell.deleteOne({ _id: id });
				if (!deletedPet) {
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
