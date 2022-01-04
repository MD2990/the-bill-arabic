import { Center } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSnapshot } from "valtio";
import state from "../stor";


export default function Paginate({res}) {
  const snap = useSnapshot(state);

  state.offset = snap.currentPage * snap.PER_PAGE;
  const pageCount = Math.ceil(res.length / snap.PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    state.currentPage = selectedPage;
  }

  
  useEffect(() => (state.currentPage = 0), [res]);

  return (
    res?.length > 0 && (
      <Center mt="7">
        <ReactPaginate
          previousLabel={"السابق →"}
          nextLabel={"← التالي"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </Center>
    )
  );
}
