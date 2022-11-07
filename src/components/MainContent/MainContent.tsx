import React, { useEffect, useRef, useState } from "react";
import { FilterBlock } from "./FilterBlock/FilterBlock";
import { SearchBar } from "./SearchBar/SearchBar";
import { Pagination } from "./Pagination/Pagination";
import { Loading } from "components/Loading/Loading";
import { Item, UserData } from "store/api-slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import { ViewBlock } from "./ViewBlock/ViewBlock";
import { CollectionList } from "./CollectionList/CollectionList";
import { BackToTopBtn } from "components/BackToTopBtn/BackToTopBtn";
import "./MainContent.scss";

interface CollectionProps {
  data: Item[];
  userData: UserData | null;
}

export function MainContent({ data, userData }: CollectionProps) {
  const [pageSize, setPageSize] = useState(20);
  const [showAllItems, setShowAllItems] = useState(false);
  const [listView, setListView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);

  const [filteredData, modifiedQuery] = useFilter({
    searchParams,
    data,
    userData,
    setPageSize,
    setShowAllItems,
    setListView,
    setCurrentPage,
  });

  useEffect(() => {
    const page = searchParams.get("currentPage");

    if (!page) {
      setCurrentPage(1);
    }
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [searchParams]);

  if (!filteredData) {
    return <Loading />;
  }

  return (
    <>
      {!userData && (
        <div>
          Please,
          <span
            className="MainContent__link"
            onClick={() => {
              navigate("/login", { replace: false });
            }}
          >
            login
          </span>
          or
          <span
            className="MainContent__link"
            onClick={() => {
              navigate("/registration", { replace: false });
            }}
          >
            sign up
          </span>
          to add favorites
        </div>
      )}
      <SearchBar data={data} setSearchParams={setSearchParams} />
      <ViewBlock
        setShowAllItems={setShowAllItems}
        setListView={setListView}
        setSearchParams={setSearchParams}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        modifiedQuery={modifiedQuery}
      />
      <div ref={divRef} className="MainContent">
        <FilterBlock
          setSearchParams={setSearchParams}
          modifiedQuery={modifiedQuery}
          slider={searchParams.get("slider")}
          isHighlight={searchParams.get("isHighlight")}
          isPublicDomain={searchParams.get("isPublicDomain")}
          sort={searchParams.get("sort")}
        />
        <CollectionList
          userData={userData}
          filteredData={filteredData}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          listView={listView}
          divRef={divRef}
          showAllItems={showAllItems}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
      {loading && (
        <div className="MainContent__loading-container">
          <Loading />
        </div>
      )}
      {!showAllItems && (
        <Pagination
          siblingCount={1}
          currentPage={currentPage}
          totalCount={filteredData.length}
          pageSize={pageSize}
          onPageChange={(page: number) => {
            window.scrollTo(0, 0);
            setCurrentPage(page);
            setSearchParams(modifiedQuery({ currentPage: page }), {
              replace: false,
            });
          }}
        />
      )}
      <BackToTopBtn />
    </>
  );
}
