import dbConnect, { toCurrency } from "../../../utils/dbConnect";
import Exp from "../../../models/Exp";
import moment from "moment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const exp = await Exp.find({}); /* find all the data in our database */
        res.status(200).json({ exp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        req.body.total_profit = toCurrency(
          req.body.workPrice -
            (req.body.elc + req.body.rent + req.body.g_exp + req.body.other_exp)
        );
        req.body.total_loss = toCurrency(
          req.body.elc + req.body.rent + req.body.g_exp + req.body.other_exp
        );

		  req.body.elc = toCurrency(req.body.elc);
		  req.body.rent = toCurrency(req.body.rent);
		  req.body.g_exp = toCurrency(req.body.g_exp);
		  req.body.other_exp = toCurrency(req.body.other_exp);
        req.body.workPrice = toCurrency(req.body.workPrice);
        
        req.body.added_date =moment(req.body.added_date).format("YYYY-MM-DD");

		  
	
        

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
