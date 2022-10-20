import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGenres } from "../../actions/genreAction";

const ItemList = (props) => {
  // const dispatch = useDispatch();
  // const genres = useSelector((state) => state.genreReducer.genres);
  // useEffect(() => {
  //   dispatch(getAllGenres());
  // }, []);
  const { items, onItemSelection, currentGenre, valueProp, textProp } = props;
  return (
    <div className="d-flex justify-content-center">
      <ul className="list-group mt-5 w-75 ">
        <li
          className={
            currentGenre === "" ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelection("")}
          style={{ cursor: "pointer" }}
        >
          All Genre
        </li>
        {items.map((item) => (
          <li
            className={
              currentGenre === item[textProp]
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item[valueProp]}
            value={item[valueProp]}
            onClick={() => onItemSelection(item[textProp])}
            style={{ cursor: "pointer" }}
          >
            {item[textProp]}
          </li>
        ))}
      </ul>
    </div>
  );
};

ItemList.defaultProps = {
  textProp: "name",
  valueProp: "_id",
};
export default ItemList;
