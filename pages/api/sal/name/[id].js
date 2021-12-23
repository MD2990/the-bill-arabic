import dbConnect from '../../../../utils/dbConnect';
import Sal from '../../../../models/Sal';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const sal = await Sal.findById(id);
				if (!sal) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ sal });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const sal = await Sal.updateMany(
					{ emp_id: id },
					{ $set: { emp_name: req.body } },
					{ multi: true }
				);
				if (!sal) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: sal });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const sal = await Sal.deleteOne({ _id: id });
				if (!sal) {
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