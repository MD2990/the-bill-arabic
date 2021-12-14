import dbConnect from '../../../utils/dbConnect';
import Exp from '../../../models/Exp';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const exp = await Exp.find({}); /* find all the data in our database */
				res.status(200).json({ exp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const exp = await Exp.create(req.body);
				/* create a new model in the database */
				res.status(201).json({ exp });
			} catch (error) {
				res.status(400).json(error.message);
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
