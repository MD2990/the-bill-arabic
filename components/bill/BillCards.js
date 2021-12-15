import { Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { Title } from "../comUtil/ComUtil";
import MySkeletons from "../../sharedComponents/MySkeletons";
import {handleDelete} from "../../utils/dbConnect"

import state from "../../stor";
import SingleCard, { AllText } from "../../sharedComponents/SingleCard";
import { handleFormDelete } from "../../lib/funcs";

export default function BillCards() {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.bill) return <MySkeletons />;
  if (!snap.bill.length) return <Title title="   لا توجد فواتير للعرض !!!" />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          company_name,
          bill_number,
          bill_date,
          bill_type,
          bill_amount,
          payment_status,
          check_date,
          notes,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4"  >
              <SingleCard
                link={`/${_id}/billEdit`}
                header={`رقم الفاتورة ${bill_number}`}
              
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "bill",
                    id: _id,
                    handleDelete,

                    secondDelete: () =>
                      (state.bill = snap.bill.filter(
                        (item) => item._id !== _id
                      )),
                  });
                }}
              >
                <AllText title=" الشركة:" data={company_name} />
                <AllText title=" النوع:" data={bill_type} />

                <AllText title=" المبلغ:" data={bill_amount} />

                <AllText
                  title=" الحالة:"
                  data={payment_status ? "لم  السداد" : "لم يتم الدفع"}
                
                />
                <AllText title=" تاريخ الشيك:" data={check_date} />
                <AllText title=" تاريخ الفاتورة:" data={bill_date} />
                <AllText title=" الملاحظات:" data={notes} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
