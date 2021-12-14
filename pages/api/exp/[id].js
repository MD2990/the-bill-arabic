import dbConnect from '../../../utils/dbConnect';
import Exp from '../../../models/Exp';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const exp = await Exp.findById(id);
				if (!exp) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ data: exp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const exp = await Exp.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!exp) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: exp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const exp = await Exp.deleteOne({ _id: id });
				if (!exp) {
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
