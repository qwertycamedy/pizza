import React, { useState } from "react";

function Categories() {
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
  const [cat, setCat] = useState(0);

  const handleClick = id => {
    setCat(id);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            className={category.id === cat ? "active" : ""}
            onClick={() => handleClick(category.id)}
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
