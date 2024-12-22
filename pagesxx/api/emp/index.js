import dbConnect from "../../../utils/dbConnect";
import Emp from "../../../models/Emp";
import moment from "moment";
import handlers from "../../../lib/midWare";

export default async function handler(req, res) {
  await handlers(req, res);
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const emp = await Emp.find({}); /* find all the data in our database */
        res.status(200).json({ emp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        req.body.empl_date = moment(req.body.empl_date).format("YYYY-MM-DD");
        req.body.added_date = moment(req.body.added_date).format("YYYY-MM-DD");

        const emp = await Emp.create(req.body);
        /* create a new model in the database */
        res.status(201).json({ emp });
      } catch (error) {
        res.status(400).json(error.message);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
