import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Image1 from "../assets/img/pexels-kish-1488463.jpg";
import Image2 from "../assets/img/pexels-kseniachernaya-3965545.jpg";
import Image3 from "../assets/img/White Clean Jewelry Landscape Banner.png";
import Image4 from "../assets/img/Home.png";

{
  /* a hook that allows you to run some side-effects (e.g., making API calls, setting timers) after rendering a component. */
}
{
  /*a hook that allows you to add state to functional components. */
}
{
  /* The Home component is a functional component that returns JSX elements. */
}
const Home = () => {
  const location = useLocation();
  const API_URL = "https://fakestoreapi.com/products";
  {
    /*  a string representing the URL of the API endpoint that returns product data. */
  }
  const [loading, setLoading] = useState(false);
  {
    /*a boolean that indicates whether the component is currently loading data (initially set to true). */
  }
  const [products, setProducts] = useState([]);
  {
    /* an array that will store the fetched product data (initially set to an empty array []). */
  }

  async function fetchProductsData() {
    setLoading(true);
    {
      /* Sets loading to true to indicate that the component is loading data. */
    }
    try {
      const output = await fetch(API_URL);
      {
        /* Makes a GET request to the API endpoint using the fetch function. */
      }
      const data = await output.json();
      {
        /* Parses the response as JSON using output.json(). */
      }
      console.log(data);
      setProducts(data);
      {
        /* Updates the products state with the received data. it is in a array */
      }
    } catch (err) {
      console.log(err);
      setProducts([]);
      {
        /* Catches any errors that might occur during the fetch process and logs them to the console. If an error occurs, it sets products to an empty array. */
      }
    }
    setLoading(false);
    {
      /* Finally, sets loading to false to indicate that the data has been loaded. */
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchProductsData().then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);
  {
    /* The useEffect hook is used to run the fetchProductsData function when the component mounts. The second argument [] is an empty dependency array, which means the effect will only run once, when the component is first rendered. */
  }
  {
    /* The component returns a JSX element that conditionally renders different content based on the loading and products states:
        If loading is true, it renders a Spinner component.
        If loading is false and products is not empty, it renders a grid of Product components, mapping over the products array. */
  }
  return (
    <div className="homepage">
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="product-grid-container p-5">
          <Image
            src={Image4}
            width="90%"
            height="auto"
            style={{
              maxHeight: "800px",
              minHeight: "200px",
              display: "block",
              margin: "auto",
            }}
          />
          {/* <Carousel>
        <Carousel.Item>
          <img src={Image1} alt="Image 1" width="100%" height="auto" style={{ maxHeight: '600px' }} />
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Image2} alt="Image 2" width="100%" height="auto" style={{ maxHeight: '600px' }} />
          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Image3} alt="Image 2" width="100%" height="auto" style={{ maxHeight: '600px' }}/>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Image4} alt="Image 2" width="100%" height="auto" style={{ maxHeight: '600px' }}/>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>*/}

          <div className="product-grid">
            {products.map((product) => {
              return (
                <div key={product.id} className="product-item">
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No Products Found</div>
      )}
    </div>
  );
};

export default Home;

//USE-EFFECT HOOK:
// useEffect is a React Hook that lets you synchronize a component with an external system.
//useEffect(setup, dependencies)
//When your component is added to the DOM, React will run your setup function.
//After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.
//Your setup code runs when your component is added to the page (mounts).
//After every re-render of your component where the dependencies have changed:
//First, your cleanup code runs with the old props and state.
//Then, your setup code runs with the new props and state.
