import React from "react";

function Categories({value, onClickCategory}) {
  const categories = [
    {
      id: 0,
      body: "Все",
    },
    {
      id: 1,
      body: "Мясные",
    },
    {
      id: 2,
      body: "Вегетарианская",
    },
    {
      id: 3,
      body: "Гриль",
    },
    {
      id: 4,
      body: "Острые",
    },
    {
      id: 5,
      body: "Закрытые",
    },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            className={category.id === value ? "active" : ""}
            onClick={() => onClickCategory(category.id)}
            key={category.id}
          >
            {category.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
