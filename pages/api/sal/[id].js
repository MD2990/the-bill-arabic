import dbConnect, { getSumToNum, toCurrency } from "../../../utils/dbConnect";
import Sal from "../../../models/Sal";
import moment from "moment";
import handlers from "../../../lib/midWare";

export default async function handler(req, res) {
  await handlers(req, res);
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const sal = await Sal.find({ emp_id: id });
        if (!sal) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ sal });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        req.body.total_salary = getSumToNum(
          req.body.basic_salary,
          req.body.bonus,
          req.body.loans
        );

        req.body.salary_date = moment(req.body.salary_date).format(
          "YYYY-MM-DD"
        );
        req.body.basic_salary = toCurrency(req.body.basic_salary);
        req.body.bonus = toCurrency(req.body.bonus);
        req.body.loans = toCurrency(req.body.loans);

        const sal = await Sal.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!sal) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: sal });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const sal = await Sal.findByIdAndDelete(id);
        if (!sal) return res.status(400).json({ success: false });
        else {
          res.status(200).json({ sal });
         
        }
      } catch (error) {
        res.status(400).json({ success: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
