import { Link } from "react-router-dom";
import leftArrowSvg from "../../assets/icons/leftArrow.svg";
import "./productAdd.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slice";

const ProductAdd = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const dispatch = useDispatch();

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
      addProduct({
        name,
        price,
        image,
      })
    );
  };

  return (
    <div className="product-add">
      <div className="back">
        <Link to="/product-list">
          <img src={leftArrowSvg} alt="back" />
        </Link>
      </div>
      <h2>ADD NEW ITEM</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          <div className="block-left">
            <div>
              <label htmlFor="product-name">Name</label>
              <input
                type="text"
                id="product-name"
                placeholder="Enter the product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="product-price">Price</label>
              <input
                type="text"
                id="product-price"
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
                src="/public/images/common/sendFile-rectangle.png"
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

export default ProductAdd;
