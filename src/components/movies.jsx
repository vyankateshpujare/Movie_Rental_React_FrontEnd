import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllMovies,
  deleteMovie,
  toggleLiked,
  totalMovies,
} from "../actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./common/pagination";
import ItemList from "./common/itemList";
import { getAllGenres } from "../actions/genreAction";
import MovieTable from "./movieTable";

export default function Movie() {
  // const [movies, setMovies] = useState(getMovies);
  const movies = useSelector((state) => state.movieReducer.movies);
  const genres = useSelector((state) => state.genreReducer.genres);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [genreName, setGenreName] = useState("");
  const [title, setTitle] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: 1 });

  const totalNoOfMovies = useSelector(
    (state) => state.movieReducer.totalMovies
  );

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(
      getAllMovies({ pageSize, currentPage, title, genreName, sortColumn })
    );
    dispatch(totalMovies({ title, genreName }));
  }, []);

  const handlePageClick = (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(
      getAllMovies({ pageSize, currentPage, title, genreName, sortColumn })
    );
  };

  const handleLiked = (id) => {
    dispatch(toggleLiked(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
    if (movies.length === 1) {
      setCurrentPage(currentPage - 1);
    }
    dispatch(
      getAllMovies({
        pageSize,
        currentPage: currentPage - 1,
        title,
        genreName,
        sortColumn,
      })
    );
    dispatch(totalMovies({ title, genreName }));
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
    dispatch(
      getAllMovies({
        pageSize,
        currentPage: 1,
        title: target.value,
        genreName,
        sortColumn,
      })
    );
    dispatch(totalMovies({ title: target.value, genreName }));
  };

  const handleGenreSelection = (gName) => {
    setGenreName(gName);
    dispatch(
      getAllMovies({
        pageSize,
        currentPage: 1,
        title,
        genreName: gName,
        sortColumn,
      })
    );
    dispatch(totalMovies({ title, genreName: gName }));
  };

  const handleSort = (sortColumn) => {
    let gName = "";
    if (genreName !== "") {
      gName = genreName;
    }
    setSortColumn(sortColumn);
    dispatch(
      getAllMovies({
        pageSize,
        currentPage,
        title,
        genreName: gName,
        sortColumn,
      })
    );
    // dispatch(totalMovies({ title, genreName }));
  };

  return (
    <React.Fragment>
      <div className="row mt-5 rounded ">
        <div className="col-3 ">
          <div className=" p-4 bg-light ">
            <Link to="/movies/addMovie">
              <button
                type="button"
                className="btn btn-secondary shadow-sm w-75 rounded p-1"
              >
                Add Movie
              </button>
            </Link>
            <input
              type="text"
              className="mt-4 w-75 p-1 rounded"
              placeholder=" Search Title "
              onChange={handleTitleChange}
            />
            <div>
              <ItemList
                items={genres}
                onItemSelection={handleGenreSelection}
                currentGenre={genreName}
                // valueProp={"_id"}
                // textProp={"name"}
              />
            </div>
          </div>
        </div>
        <div className="col">
          {movies.length === 0 ? (
            <h4>No Data Found</h4>
          ) : (
            <MovieTable
              movies={movies}
              onSort={handleSort}
              onLike={handleLiked}
              onDelete={handleDelete}
              sortColumn={sortColumn}
              on
            />
          )}
          <Pagination
            itemsCount={totalNoOfMovies}
            pageSize={pageSize}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
