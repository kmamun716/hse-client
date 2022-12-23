import React from "react";

const Paginate = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }
  return (
    <div>
      <div className="btn-group">
        <button className="btn" onClick={prevPage}>«</button>
        {
          pageNumbers?.map(pgNumber => <button 
            key={pgNumber} 
            className={`btn ${currentPage === pgNumber ? "btn-active" : ""}`}
            onClick={()=>setCurrentPage(pgNumber)}
            >{pgNumber}</button>)
        }
        <button className="btn" onClick={nextPage}>»</button>
      </div>
    </div>
  );
};

export default Paginate;
