import dbConnect, { getSumToNum, toCurrency } from "../../../utils/dbConnect";
import Sal from "../../../models/Sal";
import moment from "moment";
import handlers from "../../../lib/midWare";

export default async function handler(req, res) {
  await handlers(req, res);
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const sal = await Sal.find({}); /* find all the data in our database */
        res.status(200).json({
          sal: sal.sort((a, b) => (a.salary_date < b.salary_date ? 1 : -1)),
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
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

        const sal = await Sal.create(req.body);
        /* create a new model in the database */
        res.status(201).json({ sal });
      } catch (error) {
        res.status(400).json(error.message);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
