import { Title } from "../comUtil/ComUtil";
import { HStack, Divider, Wrap, WrapItem, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { SalButtons } from "./allSalButtons";
import AllSalCards from "./allSalCards";
import { MainInterface } from "../../sharedComponents/MainInterface";
import Paginate from "../../sharedComponents/Paginate";
import state from "../../stor";
import { useSnapshot } from "valtio";
import { colors } from "../../lib/constants";
import {
  Table,
  Thead,
  Tbody,

  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { handleFormDelete, setItem } from "../../lib/funcs";
import { handleDelete } from "../../utils/dbConnect";

export default function ShowAllSal({ sal }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.title = " جميع الرواتب";
     state.subTitle = snap.searchTerm ? ` للموظف ${snap.searchTerm.toUpperCase()}` : "";
     state.isMonthFilter=false;

  }, [snap.searchTerm]);

  return (
    <>
      <Title title={snap.title} color={colors.salDark}>
      {  snap.isMonthFilter &&  <Text as='span'  color='blue.300' >
          {snap.subTitle}
        </Text>}
      </Title>

      <MainInterface>
        <SalButtons sal={sal} />

        <Divider mt="-8" />
       { snap.searchResults.length>0  && <TheTable />}

        {/*   <AllSalCards /> */}
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}

const TheTable = () => {
  const router = useRouter();
  const [dec, setDec] = useState(false);
  const [arrowIcon, setArrowIcon] = useState("");
  const ArrowIcon = dec ? "▼" : "▲";
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  const sortArray = ({ array, key, isTrue }) => {
    key = key.toLowerCase().trim();

    return array.sort((a, b) => {
      setArrowIcon(key);
      if (isTrue) return a[key] < b[key] ? -1 : 1;
      return a[key] > b[key] ? -1 : 1;
    });
  };

  async function deleteSalary(id) {
    await handleFormDelete({
      deleteUrl: "sal",
      id: id,

      handleDelete,

      secondDelete: () =>
        (state.allSal = snap.allSal.filter((item) => item._id !== id)),
    });
  }
  return (
    <Wrap justify={"center"}>
      <WrapItem>
        <Table variant="striped" colorScheme="teal">
          <TableCaption
            userSelect={"none"}
            placement="top"
            fontSize={["sm", "md", "xl", "2xl"]}
          >
            بيانات الرواتب لجميع الموظفين
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ت</Th>
              <Th
                cursor={"pointer"}
                onClick={() => {
                  setDec(!dec);

                  sortArray({
                    array: state.searchResults,
                    key: "emp_name",
                    isTrue: dec,
                  });
                }}
              >
                الإسم {arrowIcon === "emp_name" ? ArrowIcon : ""}
              </Th>

              <Th
                cursor={"pointer"}
                onClick={() => {
                  setDec(!dec);

                  sortArray({
                    array: state.searchResults,
                    key: "salary_date",
                    isTrue: dec,
                  });
                }}
              >
                تاريخ الإستلام
                {arrowIcon === "salary_date" ? ArrowIcon : ""}
              </Th>

              <Th>تعديل /عرض</Th>
              <Th>حذف</Th>
            </Tr>
          </Thead>

          <Tbody>
            {rs().map(({ _id, emp_name, salary_date }, index) => {
              return (
                <Tr key={_id}>
                  <Td>{index + 1}</Td>
                  <Td>{emp_name}</Td>

                  <Td>{salary_date}</Td>

                  <Td
                    onClick={() => {
                      setItem("emp", emp_name);
                      router.push(`/${_id}/salEdit`);
                    }}
                    cursor={"pointer"}
                  >
                    <EditIcon color={"green.600"} />{" "}
                  </Td>
                  <Td onClick={() => deleteSalary(_id)} cursor={"pointer"}>
                    <DeleteIcon color={"red.300"} />{" "}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </WrapItem>
    </Wrap>
  );
};