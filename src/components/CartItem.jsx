import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { remove } from "../redux/Slices/cartSlice";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";


{/* The CartItem component is a functional component that displays a single cart item and allows the user to remove it from the cart. */}
{/* The component receives an item prop, which is an object with properties like title, description, image, and price. */}

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item Removed From Cart");
  };
  return (
    <>
      <Figure>
        <Figure.Image width={171} height={180} alt="171x180" style={{padding:'10px',border: "2px solid white"}} src={item.image} />
        <Figure.Caption>
          <h1 style={{color:'white',}}>{item.title}</h1>
          <p style={{color:'white',}}>{item.description}</p>
        </Figure.Caption>
        <Figure.Caption>
          <div className="container-self">
            <div className="left-self">${item.price}</div>
            <div className="right-self">
              <button class="btn btn-sm btn-danger" onClick={removeFromCart}>
                <AiFillDelete />
              </button>
            </div>
          </div>
        </Figure.Caption>
      </Figure>

     
    </>
  );
};

export default CartItem;
