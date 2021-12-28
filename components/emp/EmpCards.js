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
                color={"green.100"}
                HD_color={"green.600"}
                _id={_id}
                showSalary
                addSalary
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
                <AllText title=" الوظيفة:" data={job} color={"green.600"} />
                <AllText
                  title=" رقم البطاقة:"
                  data={civil_id}
                  color={"green.600"}
                />
                <AllText
                  title=" تاريخ الاضافة:"
                  data={added_date}
                  color={"green.600"}
                />
                <AllText
                  title=" رقم الجواز :"
                  data={passport_number}
                  color={"green.600"}
                />
                <AllText
                  title=" تاريخ التوظيف:"
                  data={empl_date}
                  color={"green.600"}
                />
                <AllText
                  title=" الملاحظات:"
                  data={remarks}
                  color={"green.600"}
                />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
