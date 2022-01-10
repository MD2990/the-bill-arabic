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
import {   handleFormDelete, reverseString } from "../../lib/funcs";

export default function SalCards() {
  const snap = useSnapshot(state);


  
  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.sal) return <MySkeletons />;
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
          emp_name,
          remarks,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                HD_color={"blue.600"}
                color={"blue.100"}
                _id={_id}
                link={`/${_id}/salEdit`}
                header={emp_name.toUpperCase()}
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
                <Box color="blue.700">
                  <AllText title=" الراتب الاساسي:" data={basic_salary} />
                  <AllText title=" المكافأة:" data={bonus} />
                  <AllText title=" القروض:" data={loans} />
                  <AllText title=" المجموع:" data={total_salary} />
                  <AllText
                    title=" تاريخ الاستحقاق:"
                    data={salary_date && reverseString(salary_date)}
                  />

                  <AllText title=" الملاحظات:" data={remarks} />
                </Box>
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
