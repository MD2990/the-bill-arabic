import axios from "axios";
import mongoose from "mongoose";
import * as currency from "currency.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

import font from "../public/Amiri-Regular-normal";
import { errorMsg, successMsg } from "../lib/funcs";
const DB = process.env.DB;
export async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxIdleTimeMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  });
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const OMR = (value) =>
  currency(value, {
    symbol: "OMR ",
    decimal: ".",
    separator: ",",
    precision: 3,
  });

export function toCurrency(number) {
  return OMR(number).format();
}

export function getSumToNum(sum1, sum2, sub) {
  let total = currency(sum1).add(sum2).subtract(sub);
  return toCurrency(total);
}

export function getSum(sum1, sub) {
  return currency(sum1).subtract(sub);
}

export async function post(url, values) {
  url = "http://localhost:3000/api/" + url;
  try {
    await axios
      .post(url, values)
      .then((res) => (res.status === 201 ? successMsg() : errorMsg()))
      .catch((error) => {
        errorMsg();
      });
  } catch (error) {
    errorMsg();
  }
}

export const handlePut = async ({ values, url, router }) => {
  const contentType = "application/json";
  const { id } = router.query;

  try {
    const res = await fetch(`/api/${url}/${id}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(values),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      errorMsg();
      res.end;
    } else {
      successMsg("تم تعديل البيانات بنجاح");
    }
  } catch (error) {
    errorMsg();
    res.end;
  }
};



export const handleDelete = async ({ deleteUrl, id }) => {
  deleteUrl = `http://localhost:3000/api/${deleteUrl}/${id}`;
  try {
    await axios
      .delete(deleteUrl)
      .then((res) => {
        if (res.status === 200) {
          successMsg("تم حذف البيانات بنجاح");
        } else {
          errorMsg();
        }
      })
      .catch((error) => {
        errorMsg();
      });
  } catch (error) {
    errorMsg();
  }
};

export const toPDF = (rows, columns, title, view = "p") => {

  const dateTimeNow =  moment().format("YYYY/MM/DD  HH:mm:ss");
  var doc = new jsPDF(view, "pt"); // l or p

  doc.addFileToVFS("Amiri.ttf", font);
  doc.addFont("Amiri.ttf", "Amiri", "normal");
  doc.setFont("Amiri");

  /*doc.autoTable(columns, ss, {
		/* 	styles: {
			cellPadding: 5,
			fontSize: 12,
			font: 'times', // helvetica, times, courier
			lineColor: 200,
			lineWidth: 0.1,
			fontStyle: 'normal', // normal, bold, italic, bolditalic
			overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
			fillColor: 255,
			textColor: 20,
			halign: 'center', // left, center, right
			valign: 'middle', // top, middle, bottom
			fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
			minCellHeight: 20,
			cellWidth: 'auto', // 'auto', 'wrap' or a number },
		}, */
  /* 	columnStyles: {
			id: { fillColor: 255 },
		},
		margin: { top: 60 }, 
		didDrawPage: function (data) {
			doc.text('Employees Salary Details', 40, 30);
		},
		didParseCell: function (table) {
			if (table.section === 'head') {
				table.cell.styles.textColor = '#000000';
				table.cell.styles.fillColor = '#B2B2FF';
			}
		},
	});*/

  const totalPagesExp = "{total_pages_count_string}";

  doc.autoTable({
    columns: columns,
    body: rows,
    headStyles: {
      halign: "center",
      fillColor: "#c3e5eb",
      textColor: "#333333",
      fontStyle: "Amiri",
      font: "Amiri",
      fontSize: 9,
    },

    styles: {
      fillStyle: "F", // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
      minCellHeight: 20,
      cellWidth: "wrap", // 'auto', 'wrap' or a number },
      valign: "middle", // top, middle, bottom
      overflow: "linebreak", // visible, hidden, ellipsize or linebreak
      cellPadding: 4,
      fontSize: 9,
      font: "Amiri", // helvetica, times, courier
      lineColor: 200,
      lineWidth: 0.1,
      halign: "center",
      fontStyle: "normal", // normal, bold, italic, bolditalic
    },
 
  
    didDrawPage: (data) => {
      if (doc.internal.getNumberOfPages() === 1) {
        doc.setFontSize(12);
        view === "p"
          ? doc.text(title  , 350, 30, "right")
          : doc.text( title, 550, 30, "right");

          doc.text(`${dateTimeNow}`, doc.internal.pageSize.width - 100, 30, "right" );
      }

      let footerStr = "Page " + doc.internal.getNumberOfPages();
      if (typeof doc.putTotalPages === "function") {
        footerStr = footerStr + " of " + totalPagesExp;
      }
      doc.setFontSize(8);
      doc.text(
        footerStr,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    },
  });
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save("table.pdf");
};
export default dbConnect;
