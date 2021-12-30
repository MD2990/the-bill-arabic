import { Box, Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import MySkeletons from "../../sharedComponents/MySkeletons";
import { handleDelete } from "../../utils/dbConnect";
import state from "../../stor";
import SingleCard, { AllText } from "../../sharedComponents/SingleCard";
import {  cutString, getItem, handleFormDelete, reverseString } from "../../lib/funcs";

export default function AllSalCards() {
  const snap = useSnapshot(state);


  
  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.allSal) return <MySkeletons />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          emp_name,
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
                      (state.allSal = snap.allSal.filter(
                        (item) => item._id !== _id
                      )),
                  });
                }}
              >
                 <Box color='blue.700' >

                <AllText
                  title=" الراتب الاساسي:"
                  data={basic_salary}
                  color="sal"
                  />
                <AllText title=" المكافأة:" data={bonus}  />
                <AllText title=" القروض:" data={loans}  />
                <AllText
                  title=" المجموع:"
                  data={total_salary}
                  
                  />
                <AllText
                  title=" تاريخ الاستحقاق:"
                  data={salary_date && reverseString(salary_date)}
                  
                  />

                <AllText title=" الملاحظات:" data={remarks}/>
      </Box>
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
