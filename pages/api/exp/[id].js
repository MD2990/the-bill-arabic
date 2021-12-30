import dbConnect, { toCurrency } from '../../../utils/dbConnect';
import Exp from '../../../models/Exp';
import moment from 'moment';

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


				   req.body.total_profit = toCurrency(
             req.body.workPrice -
               (req.body.elc +
                 req.body.rent +
                 req.body.g_exp +
                 req.body.other_exp)
           );
           req.body.total_loss = toCurrency(
             req.body.elc + req.body.rent + req.body.g_exp + req.body.other_exp
           );

           req.body.elc = toCurrency(req.body.elc);
           req.body.rent = toCurrency(req.body.rent);
           req.body.g_exp = toCurrency(req.body.g_exp);
           req.body.other_exp = toCurrency(req.body.other_exp);
           req.body.workPrice = toCurrency(req.body.workPrice);

           req.body.added_date = moment(req.body.added_date).format(
             "YYYY-MM-DD"
           );
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
