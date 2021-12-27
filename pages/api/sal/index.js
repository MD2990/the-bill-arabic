import dbConnect, { getSumToNum } from "../../../utils/dbConnect";
import Sal from "../../../models/Sal";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const sal = await Sal.find({}); /* find all the data in our database */
        res.status(200).json({ sal });
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
