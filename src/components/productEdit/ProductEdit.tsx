import { Link, useParams } from "react-router-dom";
import leftArrowSvg from "../../assets/icons/leftArrow.svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getProducts } from "../../redux/slice";

import "./productEdit.css";

interface ProductServer {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ProductEdit = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  const params = useParams();
  const id = params.id ? +params.id : null;

  const product = products.find((element: ProductServer) => element.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    if (element.files && element.files[0]) {
      const file = element.files[0];
      setImage(file);

      const linkImage = URL.createObjectURL(file);
      if (imagePreviewRef.current) {
        imagePreviewRef.current.src = linkImage;
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      editProduct({
        id: id,
        updateProduct: {
          name: name || product.name,
          price: price || product.price,
          image,
          _method: "PUT",
        },
      })
    );
  };

  return (
    <div className="product-edite">
      <div className="back">
        <Link to="/product-list">
          <img src={leftArrowSvg} alt="back" />
        </Link>
      </div>
      <h2>EDIT ITEM</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          <div className="block-left">
            <div>
              <label htmlFor="product-name">Name</label>
              <input
                type="text"
                id="product-name"
                defaultValue={product.name || ""}
                placeholder="Enter the product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="product-price">Price</label>
              <input
                type="text"
                id="product-price"
                defaultValue={product.price || ""}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter the product price"
              />
            </div>
          </div>
          <div className="block-right">
            <label htmlFor="profile-image-input">Image</label>
            <input
              type="file"
              id="profile-image-input"
              className="profile-image-input"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-image-input" className="profile-image">
              <img
                src={`${
                  product.image_url ||
                  "/public/images/common/sendFile-rectangle.png"
                }`}
                alt="Upload"
                ref={imagePreviewRef}
              />
            </label>
          </div>
        </div>
        <div className="submit-container">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
