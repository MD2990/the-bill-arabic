import dbConnect, { getSum, toCurrency } from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
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
        const bill = await Bill.findById(id);
        if (!bill) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ data: bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        let { details, bill_date, advance, total_price, balance, remarks } =
          req.body;
        advance = toCurrency(advance);
        total_price = toCurrency(total_price);

        balance = getSum(total_price, advance);
        balance = toCurrency(balance);

        bill_date = bill_date.replace(/T/, " ");

        const bill = await Bill.findByIdAndUpdate(
          id,
          {
            details,
            bill_date,
            advance,
            total_price,
            balance,
            remarks,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!bill) {
          return res.status(400).json({ success: false, data: bill });
        }
        res.status(200).json({ success: true, data: bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const bill = await Bill.deleteOne({ _id: id });
        if (!bill) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
