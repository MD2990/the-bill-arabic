import dbConnect, { getSum, toCurrency } from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import moment from "moment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const bill = await Bill.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let { details, bill_date, advance, total_price, balance, remarks } =
          req.body;
        advance = toCurrency(advance);
        total_price = toCurrency(total_price);

        balance = getSum(total_price, advance);
        balance = toCurrency(balance);

        bill_date = moment(bill_date).format("YYYY-MM-DD");

        const bill = await Bill.create({
          details,
          bill_date,
          advance,
          total_price,
          balance,
          remarks,
        });
        /* create a new model in the database */
        res.status(201).json({ bill });
      } catch (error) {
        res.status(400).json(error.message);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
