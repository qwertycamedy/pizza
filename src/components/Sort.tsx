import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSort, setSortIsOpen } from "../redux/slices/filtersSlice";
import { selectFilters } from "../redux/slices/filtersSlice";

type sortItem = {
  value: string;
  body: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
}
export const sorts: sortItem[] = [
  {
    value: "rating",
    body: "популярности",
  },
  {
    value: "-rating",
    body: "популярности ASC",
  },
  {
    value: "price",
    body: "цене",
  },
  {
    value: "-price",
    body: "цене ASC",
  },
  {
    value: "title",
    body: "алфавиту",
  },
  {
    value: "-title",
    body: "алфавиту ASC",
  },
];

const Sort = () => {
  const dispatch = useDispatch();
  const {activeSort, sortIsOpen} = useSelector(selectFilters);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickOpen = () => {
    dispatch(setSortIsOpen(!sortIsOpen));
  };

  const onClickSort = (val:sortItem) => {
    dispatch(setActiveSort(val));
    dispatch(setSortIsOpen(!sortIsOpen));
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const _event = event as PopupClick;
      const path = _event.path || (_event.composedPath && _event.composedPath());
      if (sortRef.current && !path.includes(sortRef.current)) {
        dispatch(setSortIsOpen(false));
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onClickOpen}>{activeSort.body}</span>
      </div>
      {sortIsOpen && (
        <div className="sort__popup">
          <ul>
            {sorts.map((obj, i) => (
              <li
                className={activeSort.value === obj.value ? "active" : ""}
                onClick={() => onClickSort(obj)}
                key={i}
              >
                {obj.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
