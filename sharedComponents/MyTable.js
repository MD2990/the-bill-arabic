import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import state from '../stor';
export function MyTable(
  { data, tableTitle = "بيانات الرواتب لجميع الموظفين" ,editFunction,deleteFunction}

) {
  const [arrowIcon, setArrowIcon] = useState("");
  const [dec, setDec] = useState(false);
  const ArrowIcon = dec ? "▼" : "▲";
  const sortArray = ({ array, key, isTrue }) => {
    return array.sort((a, b) => {
      key = key.toLowerCase().trim();
     
      setArrowIcon(key);
      if (isTrue) return a[key] < b[key] ? -1 : 1;
      return a[key] > b[key] ? -1 : 1;
    });
  };
  return (
    <Wrap justify={"center"}>
      <WrapItem>
        <Table variant="striped" colorScheme="teal">
          <TableCaption
            userSelect={"none"}
            placement="top"
            fontSize={["sm", "md", "xl", "2xl"]}
          >
            {tableTitle}
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
                    key:
                     
                      "emp_name",
                    isTrue: dec,
                  });
                }}
              >
                الإسم{" "}
                {arrowIcon ===  "emp_name" ? ArrowIcon : ""}
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
                {arrowIcon ===  "salary_date" ? ArrowIcon : ""}
              </Th>

              <Th>تعديل /عرض</Th>
              <Th>حذف</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data().map(({ _id, emp_name, salary_date }, index) => {
              return (
                <Tr key={_id}>
                  <Td>{index + 1}</Td>
                  <Td>{emp_name}</Td>

                  <Td>{salary_date}</Td>

                  <Td
                    onClick={()=> editFunction(_id)
                    }
                    cursor={"pointer"}
                  >
                    <EditIcon color={"green.600"} />{" "}
                  </Td>
                  <Td onClick={() => deleteFunction(_id)} cursor={"pointer"}>
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

}
