import { FC, useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { sorts } from "../components/Sort";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  setCurPage,
  setCategoryId,
  setFilters,
  selectFilters,
} from "../redux/slices/filtersSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import NotFoundBlock from "../components/NotFoundBlock";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loadStatus } = useSelector(selectPizzas);
  const { curPage, categoryId, activeSort, searchValue } =
    useSelector(selectFilters);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "",
      sort = activeSort.value.replace("-", ""),
      order = activeSort.value.includes("-") ? "asc" : "desc",
      search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
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

  const onClickCategory = (val: number) => {
    dispatch(setCategoryId(val));
  };
  const onChangePage = (n: number) => {
    dispatch(setCurPage(n));
    window.scrollTo(0, 0);
  };

  const pizzas = items.map((pizza: any, i: number) => (
      <PizzaBlock pizza={pizza} key={i}/>
  ));
  const sceletons = [...new Array(6)].map((_, i) => <Sceleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {loadStatus === "error" ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">
          {loadStatus === "loading" ? sceletons : pizzas}
        </div>
      )}
      <Pagination curPage={curPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
