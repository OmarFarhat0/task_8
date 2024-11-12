import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../redux/slice";

import "./productDetails.css";
import leftArrowSvg from "../../assets/icons/leftArrow.svg";

interface ProductServer {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const products = useSelector((state) => state.products);
  const params = useParams();
  const id = params.id ? +params.id : null;
  const product = products.find((element: ProductServer) => element.id === id);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="back">
        <Link to="/product-list">
          <img src={leftArrowSvg} alt="back" />
        </Link>
      </div>
      <div className="item">
        <h2>{product.name}</h2>
        <img
          src={product.image_url}
          alt={product.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "images/common/box.png";
          }}
        />
        <div className="line-feature">
          <p>
            price:&nbsp;<span>{product.price}$</span>
          </p>
          <p>
            Added at:&nbsp;<span>{formatDate(product.created_at)}</span>
          </p>
        </div>
        <div className="line-feature">
          <p>
            updated at:&nbsp;<span>{formatDate(product.updated_at)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
