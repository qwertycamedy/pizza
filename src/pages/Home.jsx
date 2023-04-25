import React, { useEffect, useRef, useState } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { sorts } from "../components/Sort";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurPage,
  setCategoryId,
  setActiveSort,
  setSortIsOpen,
  setFilters,
} from "../redux/slices/filtersSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import NotFoundBlock from "../components/NotFoundBlock";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loadStatus } = useSelector(state => state.pizzas);
  const { curPage, categoryId, activeSort, sortIsOpen, searchValue } =
    useSelector(state => state.filters);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {

    const category = categoryId > 0 ? `category=${categoryId}` : "",
      sort = activeSort.value.replace("-", ""),
      order = activeSort.value.includes("-") ? "asc" : "desc",
      search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        curPage,
        category,
        sort,
        order,
        search,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find(obj => obj.value === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    !isSearch.current && getPizzas();

    isSearch.current = false;
  }, [categoryId, activeSort, searchValue, curPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.value,
        categoryId,
        curPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, activeSort, curPage]);

  const onClickCategory = val => {
    dispatch(setCategoryId(val));
  };
  const onClickSort = val => {
    dispatch(setActiveSort(val));
    dispatch(setSortIsOpen(!sortIsOpen));
  };
  const onChangePage = n => {
    dispatch(setCurPage(n));
    window.scrollTo(0, 0);
  };

  const pizzas = items.map((pizza, i) => <PizzaBlock pizza={pizza} key={i} />);
  const sceletons = [...new Array(6)].map((_, i) => <Sceleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort
          isOpen={sortIsOpen}
          setIsOpen={setSortIsOpen}
          activeSort={activeSort}
          onClickSort={onClickSort}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        loadStatus === 'error' ? (
          <NotFoundBlock />
        ) : (
          <div className="content__items">
            {loadStatus === "loading" ? sceletons : pizzas}
          </div>
        )
      }
      <Pagination curPage={curPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
