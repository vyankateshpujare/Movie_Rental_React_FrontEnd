import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import TableHeader from "./tableHeader";

const MovieTable = (props) => {
  const { movies, onSort, sortColumn ,onLike,onDelete} = props;

  const columns = [
    { path: "title", header: "Title" },
    { path: "genre.name", header: "Genre" },
    { path: "dailyRentalRate", header: "Rate" },
    { path: "numberInStock", header: "Stock" },
    { key: "like" },
    { key: "delete" },
  ];
  return (
    <>
      <table className="table shadow-sm w-75">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <tbody>
          {movies.map((m) => (
            <tr key={m._id}>
              <td>
                <Link
                  to={`/movies/${m._id}`}
                  className="text-decoration-none text-black"
                >
                  {m.title}
                </Link>
              </td>
              <td>{m.genre.name}</td>
              <td>{m.dailyRentalRate}</td>
              <td>{m.numberInStock}</td>
              <td
                className={m.liked ? "text-danger" : "text-dark"}
                  onClick={() => onLike(m._id)}
              >
                {m.liked ? <BsSuitHeartFill /> : <BsSuitHeart />}
              </td>
              <td>
                <button
                  className="btn btn-secondary rounded-circle"
                  onClick={() => onDelete(m._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MovieTable;
