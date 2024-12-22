import React from "react";
import { Hd } from "../components/comUtil/ComUtil";
import AddExp from "../components/exp/AddExp";

export default function AddNewExpPage({ title }) {
  return (
    <>
      <Hd title={title} />
      <AddExp />
    </>
  );
}
export async function getStaticProps() {
  return {
    props: { title: "إضافة مصروفات" },
  };
}
