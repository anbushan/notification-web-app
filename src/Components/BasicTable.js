import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaSort } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios"; // Import Axios
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons"; // for customizing icons

const BasicTable = (props) => {
  const columns = useMemo(() => props.COLUMNS);
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://notification-mysql-48f715723b35.herokuapp.com/v1/api/get-push-notification?page=${currentPage}&limit=10&sortField=NotificationId&sortOrder=desc`
      )
      .then((response) => {
        setTableData(response?.data?.data || []);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      })
      .catch((error) => {
        console.log("AxiosError:", error);
      });
  }, [currentPage]);
  useEffect(() => {
    console.log("Total Pages:", totalPages);
  }, [totalPages, tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    prepareRow,
    rows,
    state,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageIndex: currentPage - 1,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div>
     
        <Row className="">
          <Form className="d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
            <Col className="mb-4 mt-4" xxl={3} xl={3} lg={3} sm={3} md={3}>
              <Form.Control
                placeholder="Search here..."
                value={state.globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value.trim())}
                className=""
              />
            </Col>
            <Col
              className="d-flex flex-column text-center m-4"
              xxl={3}
              xl={3}
              lg={3}
              sm={3}
              md={3}
            >
              <Button
                className="fw-bold "
                style={{
                  backgroundColor: "#0d6efd",
                  outline: "none",
                  border: "none",
                  color: "white",
                }}
              >
                Search
              </Button>
            </Col>
          </Form>
        </Row>
        <Row>
          <Table striped bordered hover {...getTableProps()} responsive={true}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {!column.disableSortBy ? (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSort />
                            ) : (
                              <>{column.render("Header")}</>
                            )
                          ) : (
                            <>
                              {column.render("Header")}
                              <FaSort className="mx-4" />
                            </>
                          )}
                        </span>
                      ) : (
                        <>{column.render("Header")}</>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows ? (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} key={cell.column.id}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-dark"
                  >
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Col
            className={`${
              rows && rows.length > 0 ? "d-flex" : "d-none"
            } flex-row justify-content-center align-items-center`}
          >
            <span className="m-1 d-flex justify-content-start align-items-center">
              Page
              <strong className="m-2">
                {state.pageIndex + 1} of {totalPages}
              </strong>
            </span>

            <Col className="d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center">
              <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                containerClassName="pagination"
                previousLabel={
                  <IconContext.Provider
                    value={{ color: "#B8C1CC", size: "36px" }}
                  >
                    <AiFillLeftCircle />
                  </IconContext.Provider>
                }
                nextLabel={
                  <IconContext.Provider
                    value={{ color: "#B8C1CC", size: "36px" }}
                  >
                    <AiFillRightCircle />
                  </IconContext.Provider>
                }
              />
            </Col>
            <Col className="d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="m-2"
              >
                <BiLeftArrow size={16} />
              </Button>
              <Button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
              >
                <BiRightArrow size={16} />
              </Button>
            </Col>
          </Col>
        </Row>
     
    </div>
  );
};

export default BasicTable;
