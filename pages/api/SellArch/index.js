import dbConnect from '../../../utils/dbConnect';
import DailySellArch from '../../../models/DailySellArch';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const sell = await DailySellArch.find(
					{}
				); /* find all the data in our database */
				res.status(200).json({ sell });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const sell = await DailySellArch.create(req.body);
				/* create a new model in the database */
				res.status(201).json({ sell });
			} catch (error) {
				res.status(400).json(error.message);
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
