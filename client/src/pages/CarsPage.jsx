/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useCars } from "../context/CarsContext";

function CarsPage() {
  const { getCars, cars } = useCars();

  useEffect(() => {
    getCars();
  }, []);

  if (cars.length === 0) return <h1>No Cars</h1>;

  return (
    <div>
      {cars.map((car) => (
        <div key={car._id}>
          <h1>{car.model}</h1>
          <h1>{car.brand}</h1>
          <h1>{car.description}</h1>
          <h1>{car.price}</h1>
          <img src={car.image} alt="Car" />
        </div>
      ))}
    </div>
  );
}

export default CarsPage;