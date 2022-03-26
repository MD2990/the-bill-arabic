import React from "react";
import { Hd } from "../components/comUtil/ComUtil";
import AddEmp from "../components/emp/AddEmp";

export default function AddnewEmpPage({ title }) {
  return (
    <>
      <Hd title={title} />
      <AddEmp />
    </>
  );
}
export async function getStaticProps() {
  return {
    props: { title: "إضافة موظف جديد" },
  };
}
