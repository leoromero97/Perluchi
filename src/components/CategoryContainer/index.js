import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { PacmanLoader } from "react-spinners";
import Error from "../Error";
import ItemList from "../ItemList";
import { db } from "../../firebase/config";
import errorSearchVector from "../../assets/vc-undraw_web_search_re_efla.svg";

function CategoryContainer({ categoryLabel }) {
  const [dataByCategory, setDataByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isError = dataByCategory.length === 0;

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const q = query(
        collection(db, "perluchiFood"),
        where("categoryLabel", "==", categoryLabel)
      );
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setDataByCategory(products);
      setIsLoading(false);
    };
    getProducts();
  }, [categoryLabel]);

  return (
    <div className="flex gap-10 flex-col items-center justify-center py-20">
      <h1 className="text-5xl font-semibold text-yellow-900">
        Categoría: {categoryLabel}
      </h1>
      {isLoading && <PacmanLoader color="#40372B" />}
      {!isLoading && !isError && <ItemList items={dataByCategory} />}
      {isError && !isLoading && (
        <Error
          message="La categoría que buscás, no se encuentra disponible"
          image={errorSearchVector}
        />
      )}
    </div>
  );
}

export default CategoryContainer;
