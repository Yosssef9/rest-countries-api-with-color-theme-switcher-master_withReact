import { useEffect, useState } from "react";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

export default function CardsContainer({
  data,
  filteredData,
  filteredDataByRegion,
}) {
  // const itemsToShow = filteredDataByRegion
  //   ? filteredDataByRegion
  //   : filteredData
  //   ? filteredData
  //   : data;
  const itemsToShow = filteredData
    ? filteredData
    : filteredDataByRegion
    ? filteredDataByRegion
    : data;
  console.log("filteredData :", filteredData);
  const [currentPage, setCurrentPage] = useState(0); // مكتبة دي تبدأ من 0
  const itemsPerPage = 8;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = itemsToShow.slice(startIndex, endIndex);
  useEffect(() => {
    const maxPage = Math.ceil(itemsToShow.length / itemsPerPage) - 1;
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPage, itemsToShow, itemsPerPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     window.scrollTo({
  //       top: document.body.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }, 100); // 100ms بس تأخير كفاية

  //   return () => clearTimeout(timeout);
  // }, [currentPage]);

  const pageCount = Math.ceil(itemsToShow.length / itemsPerPage);
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsToShow]);

  return (
    <>
      <div className={styles.container}>
        {currentItems.map((item) => (
          <Link
            key={item.name}
            to={`/country/${item.name}`}
            className={styles.cardLink}
            state={item}
          >
            <Card {...item} />
          </Link>
        ))}
      </div>
      {filteredData.length == 0 ? (
        <div className={styles.noData}>No countrys to show</div>
      ) : (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination} // class للتنسيق
          pageClassName={styles.pageItem} // كل زر صفحة
          pageLinkClassName={styles.pageLink} // اللينك جوه الصفحة
          previousClassName={styles.prev} // Previous button
          nextClassName={styles.next} // Next button
          activeClassName={styles.active} // الصفحة الحالية
          disabledClassName={styles.disabled}
        />
      )}
    </>
  );
}
