import dbConnect from '../../../utils/dbConnect';
import Emp from '../../../models/Emp';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const emp = await Emp.findById(id);
				if (!emp) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ emp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const emp = await Emp.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!emp) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ emp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const emp = await Emp.findByIdAndDelete(id);
				if (!emp) return res.status(400).json({ success: false });
				res.status(200).json({ emp });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
