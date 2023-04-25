import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import cl from "./Search.module.scss";
import trashImg from "../../assets/img/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filtersSlice";

function Search() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { searchValue } = useSelector(state => state.filters);

  const searchInput = useRef();

  const updateSearchValue = useCallback(
    debounce(str => dispatch(setSearchValue(str)), 350),
    []
  );

  const onChange = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value)
  }

  const onClear = () => {
    setValue('');
    dispatch(setSearchValue(""));
    searchInput.current.focus();
  };

  return (
    <label className={cl.label}>
      <input
        className={cl.input}
        type="text"
        ref={searchInput}
        value={value}
        onChange={onChange}
        placeholder="Search pizza.."
      />
      {searchValue && (
        <img
          onClick={onClear}
          className={cl.close}
          src={trashImg}
          alt="trash"
        />
      )}
    </label>
  );
}

export default Search;
