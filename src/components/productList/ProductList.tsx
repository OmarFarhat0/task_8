import { useDispatch, useSelector } from "react-redux";
import searchIcon from "./../../assets/icons/search.svg";
import "./productList.css";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../redux/slice";
import ConfirmDelete from "../confirmDelete/ConfirmDelete";
import { Link } from "react-router-dom";

interface ProductServer {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product: ProductServer) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProductById = (id: number): void => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="product-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search product by name"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} className="search-image" alt="search" />
      </div>
      <div className="add-product-container">
        <Link to="/product-add">
          <button className="add-product-button">ADD NEW PRODUCT</button>
        </Link>
      </div>
      <div className="items">
        {filteredProducts.map((element: ProductServer) => {
          return (
            <div key={element.id} className="item">
              <Link
                to={`/product-details/${element.id}`}
                className="item-content"
                onClick={() => {
                  console.log("hi");
                }}
              >
                <img
                  src={element.image_url}
                  alt={element.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "images/common/box.png";
                  }}
                />
                <div className="item-overlay">
                  <p className="product-name">{element.name}</p>
                  <div className="buttons-container">
                    <Link to={`/product-edite/${element.id}`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                    <ConfirmDelete
                      funcYes={deleteProductById}
                      id={element.id}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
