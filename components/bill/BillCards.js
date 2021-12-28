import { Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { Title } from "../comUtil/ComUtil";
import MySkeletons from "../../sharedComponents/MySkeletons";
import { handleDelete } from "../../utils/dbConnect";

import state from "../../stor";
import SingleCard, { AllText } from "../../sharedComponents/SingleCard";
import { cutString, handleFormDelete } from "../../lib/funcs";

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
          details,

          bill_date,
          advance,
          total_price,
          balance,

          remarks,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                color={'green.100'}
                link={`/${_id}/billEdit`}
                header={`رقم الفاتورة ${cutString(_id, 18, 24)}`}
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
                <AllText title=" التفاصيل:" data={details} />
                <AllText title=" الإجمالي:" data={total_price} />
                <AllText title=" المبلغ المدفوع:" data={advance} />
                <AllText title=" المبلغ المتبقي:" data={balance} />
                <AllText title=" تاريخ الفاتورة:" data={bill_date} />
                <AllText title=" الملاحظات:" data={remarks} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
