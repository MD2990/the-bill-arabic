import React, { useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
  IconButton,
  color,
} from "@chakra-ui/react";
import state from "../stor";
import { FaMoneyBillWave } from "react-icons/fa";
import { useSnapshot } from "valtio";
import { handleFormDelete, setItem } from "../lib/funcs";
import { handleDelete } from "../utils/dbConnect";
import { useRouter } from "next/router";
import { colors } from "../lib/constants";

export function MyTable({ data, tableTitle, emp, allSal }) {
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

  const snap = useSnapshot(state);
  const salCount = (_id) =>
    snap.allSal.filter(({ emp_id }) => emp_id === _id).length;

  const EmpTableData = ({ data }) => {
    const router = useRouter();
    return (
      <>
        {data().map(({ _id, emp_name, added_date }) => {
          const deleteFunction = async () => {
            await handleFormDelete({
              deleteUrl: "emp",
              id: _id,

              handleDelete,

              secondDelete: () =>
                (state.emp = snap.emp.filter((item) => item._id !== _id)),
            });
          };
          return (
            <Tr key={_id}>
              <Td>{added_date}</Td>
              <Td
                onClick={() => router.push(`/${_id}/empEdit`)}
                cursor={"pointer"}
              >
                <EditIcon color={"green.600"} />
              </Td>
              <Td onClick={deleteFunction} cursor={"pointer"}>
                <DeleteIcon color={"red.300"} />
              </Td>

              <Td>
                <IconButton
                  variant="unstyled"
                  aria-label="Show Salaries"
                  icon={<FaMoneyBillWave />}
                  color={`${colors.empDark.substring(
                    colors.empDark.length - 4,
                    0
                  )}`}
                  size="1.8rem"
                  onClick={() => {
                    router.push(`/${_id}/showSalPage`);
                    setItem("emp", emp_name);
                  }}
                />
              </Td>
              <Td>
                <IconButton
                  variant="unstyled"
                  aria-label="Add Salary"
                  icon={<AddIcon />}
                  color={`${colors.empDark.substring(
                    colors.empDark.length - 4,
                    0
                  )}`}
                  size="1.5rem"
                  onClick={() => {
                    router.push(`/${_id}/addSalaryPage`);
                    setItem("emp", emp_name);
                  }}
                />
              </Td>
              <Td>{salCount(_id)}</Td>
            </Tr>
          );
        })}
      </>
    );
  };

  const EmpTableRows = () => (
    <>
      <Thead>
        <Tr>
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
                key: "added_date",
                isTrue: dec,
              });
            }}
          >
            تاريخ الإستلام
            {arrowIcon === "added_date" ? ArrowIcon : ""}
          </Th>

          <Th>تعديل /عرض</Th>
          <Th>حذف</Th>
          <Th>عرض الرواتب</Th>
          <Th>إضافة راتب</Th>
          <Th>الرواتب</Th>
        </Tr>
      </Thead>
      <Tbody>
        <EmpTableData data={data} />
      </Tbody>
    </>
  );

  const AllSalTableData = ({ data }) => {
    const router = useRouter();
    return (
      <>
        {data().map(({ _id, emp_name, salary_date, emp_id }) => {
          const deleteFunction = async () => {
            await handleFormDelete({
              deleteUrl: "sal",
              id: _id,

              handleDelete,

              secondDelete: () =>
                (state.allSal = snap.allSal.filter((item) => item._id !== _id)),
            });
          };
          return (
            <Tr key={_id}>
              <Td>{emp_name}</Td>
              <Td>{salary_date}</Td>
              <Td
                onClick={() => router.push(`/${_id}/salEdit`)}
                cursor={"pointer"}
              >
                <EditIcon color={"green.600"} />
              </Td>
              <Td onClick={deleteFunction} cursor={"pointer"}>
                <DeleteIcon color={"red.300"} />
              </Td>

              <Td>
                <IconButton
                  variant="unstyled"
                  aria-label="Show Salaries"
                  icon={<FaMoneyBillWave />}
                  color={`${colors.empDark.substring(
                    colors.empDark.length - 4,
                    0
                  )}`}
                  size="1.8rem"
                  onClick={() => {
                    router.push(`/${emp_id}/showSalPage`);
                    setItem("emp", emp_name);
                  }}
                />
              </Td>
              <Td>
                <IconButton
                  variant="unstyled"
                  aria-label="Add Salary"
                  icon={<AddIcon />}
                  color={`${colors.empDark.substring(
                    colors.empDark.length - 4,
                    0
                  )}`}
                  size="1.5rem"
                  onClick={() => {
                    router.push(`/${_id}/addSalaryPage`);
                    setItem("emp", emp_name);
                  }}
                />
              </Td>
            </Tr>
          );
        })}
      </>
    );
  };

  const AllSalTableRows = () => (
    <>
      <Thead>
        <Tr>
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

          <Th>تعديل</Th>
          <Th>حذف</Th>
          <Th>عرض </Th>
          <Th>إضافة </Th>
        </Tr>
      </Thead>
      <Tbody>
        <AllSalTableData data={data} />
      </Tbody>
    </>
  );

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

          {emp && <EmpTableRows />}
          {allSal && <AllSalTableRows />}
        </Table>
      </WrapItem>
    </Wrap>
  );
}
