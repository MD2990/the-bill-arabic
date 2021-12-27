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
import {  getItem, handleFormDelete } from "../../lib/funcs";

export default function SalCards() {
  const snap = useSnapshot(state);


  
  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.sal) return <MySkeletons />;
  if (!snap.sal.length) return <Title title="   لا توجد فواتير للعرض !!!" />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          basic_salary,
          bonus,
          loans,
          total_salary,
          salary_date,
          remarks,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                _id={_id}
                link={`/${_id}/salEdit`}
                header={getItem('emp')?.toUpperCase()}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "sal",
                    id: _id,

                    handleDelete,

                    secondDelete: () =>
                      (state.sal = snap.sal.filter((item) => item._id !== _id)),
                  });
                }}
              >
              
                <AllText title=" الراتب الاساسي:" data={basic_salary} />
                <AllText title=" المكافأة:" data={bonus} />
                <AllText title=" القروض:" data={loans} />
                <AllText title=" المجموع:" data={total_salary} />
                <AllText title=" تاريخ الاستحقاق:" data={salary_date} />


               
                <AllText title=" الملاحظات:" data={remarks} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
