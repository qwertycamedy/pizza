import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Pizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: number;
    types: number;
    rating: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64355b0983a30bc9ad5e75ef.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="flex">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <div>
        <h2>{pizza.title}</h2>
        <p>
          рейтинг: {pizza.rating}
          <br />
          тип: {pizza.types}
          <br />
          размер: {pizza.sizes}
          <br />
        </p>
        <h4>цена: {pizza.price}</h4>
      </div>
    </div>
  );
};

export default Pizza;
