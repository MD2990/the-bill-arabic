import dbConnect, { toCurrency } from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import { convertDate, getDate } from "../../../lib/funcs";

export default async function handler(req, res) {
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
        let {
          bill_amount,
          company_name,
          bill_number,
          bill_date,
          bill_type,
          payment_status,
          check_date,
          notes,
        } = req.body;

        bill_amount = toCurrency(bill_amount);
        bill_date = getDate(bill_date);
        check_date = getDate(check_date);

        const bill = await Bill.findByIdAndUpdate(
          id,
          ({bill_amount,
          company_name,
          bill_number,
          bill_date,
          bill_type,
          payment_status,
          check_date,
          notes}),
          {
            new: true,
            runValidators: true,
          }
        );
        if (!bill) {
          return res.status(400).json({ success: false });
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
