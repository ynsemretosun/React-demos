import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ totalData, dataPerPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pages = Math.ceil(totalData / dataPerPage);

  function handleNextPage() {
    const nextPage = currentPage !== pages ? currentPage + 1 : currentPage;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }
  function handlePrevPage() {
    const prevPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }
  function handlePageChange(e) {
    const page = Number(e.target.value);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }
  const firstDataIndex = (currentPage - 1) * dataPerPage + 1;
  console.log(firstDataIndex);
  console.log(totalData);
  const lastDataIndex = pages !== 1 ? currentPage * dataPerPage : totalData;

  return (
    <StyledPagination>
      <P>
        Showing{" "}
        <span>
          {firstDataIndex}-{lastDataIndex}
        </span>{" "}
        of <span>{totalData}</span> results
      </P>
      {pages > 1 && (
        <Buttons>
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <HiChevronLeft /> <span>Previous</span>
          </PaginationButton>
          {[...Array(pages)].map((_, index) => (
            <PaginationButton
              key={index}
              value={index + 1}
              active={index + 1 === currentPage}
              onClick={handlePageChange}
            >
              {index + 1}
            </PaginationButton>
          ))}
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === pages}
          >
            <HiChevronRight /> <span>Next</span>
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
}

export default Pagination;
