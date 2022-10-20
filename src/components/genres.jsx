import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGenre, getAllGenres, totalGenre } from "../actions/genreAction";
import Pagination from "./common/pagination";

export default function Genre() {
  // const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const totalNoOfGenres = useSelector((state) => state.genreReducer.totalGenre);
  console.log(totalNoOfGenres)
  const genres = useSelector((state) => state.genreReducer.genres);

  useEffect(() => {
    dispatch(getAllGenres({ currentPage, pageSize }));
    dispatch(totalGenre());
  }, []);

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(getAllGenres({ currentPage, pageSize }));
  };

  const handleDelete = (id) => {
    dispatch(deleteGenre(id));
  };

  return (
    <React.Fragment>
      <div className="row mt-5  rounded">
        <div className="col-3">
          <Link to="/genres/addGenre">
            <button
              type="button"
              className="btn btn-light shadow-sm w-75 rounded p-1"
            >
              Add Genre
            </button>
          </Link>
        </div>
        <div className="col">
          {genres.length === 0 ? (
            <h4>No Data Found</h4>
          ) : (
            <table className="table shadow-sm w-75">
              <thead className="shadow-sm bg-light">
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {genres.map((g) => (
                  <tr key={g._id}>
                    <td>
                      <Link
                        to={`/genres/${g._id}`}
                        className="text-decoration-none text-black"
                      >
                        {g.name}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary rounded-circle"
                        onClick={() => handleDelete(g._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            itemsCount={totalNoOfGenres}
            pageSize={pageSize}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
