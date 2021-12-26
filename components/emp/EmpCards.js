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

export default function EmpCards() {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.emp) return <MySkeletons />;
  if (!snap.emp.length) return <Title title="   لا توجد فواتير للعرض !!!" />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_date,
          added_date,
          remarks,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                link={`/${_id}/empEdit`}
                header={emp_name?.toUpperCase()}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "emp",
                    id: _id,
                    handleDelete,

                    secondDelete: () =>
                      (state.emp = snap.emp.filter((item) => item._id !== _id)),
                  });
                }}
              >
                <AllText title=" الوظيفة:" data={job} />
                <AllText title=" رقم البطاقة:" data={civil_id} />
                <AllText title=" تاريخ الاضافة:" data={added_date} />
                <AllText title=" رقم الجواز :" data={passport_number} />
                <AllText title=" تاريخ التوظيف:" data={empl_date} />
                <AllText title=" الملاحظات:" data={remarks} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
