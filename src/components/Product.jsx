import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

/*useDispatch is a hook that returns the dispatch function from the Redux store. It is used to dispatch actions to the store. */

/* useEffect is a Hook in React that allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers.

The useEffect Hook accepts two arguments. The second argument is optional.

useEffect(<function>, <dependency>)
 */

/* useSelector is a hook that allows you to extract data from the Redux store state. It takes a function as an argument, which is called with the entire Redux store state as an argument. The return value of this function is the value that will be returned from useSelector. */

const Product = ({ product }) => {
  {/* The Product component takes a product prop, which is an object with properties like title, description, image, and price. */}
  const { cart } = useSelector((state) => state);// access redux store state 
  const dispatch = useDispatch();//dispatch actions

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item Added To Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.error("Item Removed From Cart");
  };


  {/* The component defines two event handlers:
       addToCart: when the "Add to Cart" button is clicked, this function is called. It dispatches the add action from the cartSlice with the product object as an argument, and then displays a success toast notification.
       removeFromCart: when the "Remove Item" button is clicked, this function is called. It dispatches the remove action from the cartSlice with the product.id as an argument, and then displays an error toast notification. */}

  return (
    <div className="proj-imgbx card-container">
      <div className="heading">
      <NavLink to={`/item/${product.id}`} state={{ product }} className="text-black hover-home "> <h2 class=" fw-bold fs-3 text-start text-truncate mt-1 w-100">
          {product.title}
        </h2>
        </NavLink>

        {/* state prop set to an object with a product property, which contains the entire product object. */}
       
      </div>
      <span>
        {product.description.split(" ").slice(0, 5).join(" ") + "..."}
      </span>

      <div
        className="image align-center"
        style={{
          height: 80 + "px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          
        }}
      >
        {" "}
        <div
          className="wrap  align-center"
          style={{
            height: "70%",
            width: "60%",
            padding: "8px",
            
          }}
        >
          <img src={product.image} alt="Product Image" className="img-fluid"  />
        </div>
      </div>

      <div
        className="d-flex justify-content-between align-items-center w-full mt-5"
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          width: "100%",
        }}
      >
        <p style={{ color: "green", fontWeight: "bold", marginTop:"20px" }}>${product.price}</p>
        {cart.some((p) => p.id == product.id) ? (
          <button class="btn transition " onClick={removeFromCart}>
            Remove Item
          </button>
        ) : (
          <button class="btn transition" onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;

{/* The component uses conditional rendering to display either the "Add to Cart" or "Remove Item" button based on whether the product is already in the cart. If the product is in the cart, it displays the "Remove Item" button; otherwise, it displays the "Add to Cart" button. */}
