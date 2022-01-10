import { Box, Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { Title } from "../comUtil/ComUtil";
import MySkeletons from "../../sharedComponents/MySkeletons";
import { handleDelete } from "../../utils/dbConnect";

import state from "../../stor";
import SingleCard, { AllText } from "../../sharedComponents/SingleCard";
import { cutString, handleFormDelete, reverseString } from "../../lib/funcs";
import { colors } from "../../lib/constants";

export default function BillCards() {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.exp) return <MySkeletons />;
  if (!snap.exp.length) return <Title title="   لا توجد فواتير للعرض !!!" />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          elc,
          rent,
          g_exp,
          workPrice,
          other_exp,
          total_profit,
          total_loss,
          added_date,
          remarks,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                HD_color={colors().expDark}
                color={"gray.100"}
                link={`/${_id}/expEdit`}
                header={`الرمز ${cutString(_id, 18, 24)}`}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "exp",
                    id: _id,
                    handleDelete,

                    secondDelete: () =>
                      (state.exp = snap.exp.filter((item) => item._id !== _id)),
                  });
                }}
              >
                <Box color={colors().expDark}>
                  <AllText
                    title="تاريخ الفاتورة:"
                    data={added_date && reverseString(added_date)}
                  />
                  <AllText title="قيمة الخدمة:" data={workPrice} />
                  <AllText title=" الكهرباء:" data={elc} />
                  <AllText title="الإيجار:" data={rent} />
                  <AllText title="مصاريف الكراج:" data={g_exp} />
                  <AllText title="مصاريف أخرى:" data={other_exp} />
                  <AllText title="الخسائر:" data={total_loss} />
                  <AllText title="صافي الربح:" data={total_profit} />
                  <AllText title="الملاحظات:" data={remarks} />
                </Box>
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
