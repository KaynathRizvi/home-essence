import { useParams } from "react-router-dom";
import './ProductView.css';

const ProductView = ({ products = [] }) => {  
  const { productId } = useParams();

  if (!products || products.length === 0) {
    return <h2>Loading products...</h2>;  // Check if products are actually coming
  }

  const product = products.find((item) => item.product_id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;  // Handle invalid product ID
  }

  return (
    <div className="product-view">
        <div className="view-img-container">
            <img src={product.product_image} alt={product.product_title} className="product-view-image" />
        </div>
      <h2 className="product-view-title">{product.product_title}</h2>
      <p className="product-view-detail">{product.product_detail}</p>
      <p className="product-view-detail">Price: ₹{product.product_price}</p>
      <button className="view-wishlist">Wishlist</button>
      <button className="view-cart">Add to Cart</button>
    </div>
  );
};

export default ProductView;
