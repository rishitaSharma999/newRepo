import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Stack,
  Modal,
  Button,
  Form,
  ModalBody,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Item() {
  const location = useLocation();
  const product = location.state.product;

  const { cart } = useSelector((state) => state); // access redux store state
  const dispatch = useDispatch(); //dispatch actions

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item Added To Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.error("Item Removed From Cart");
  };

  return (
    product && (
      <Container>
        <Row>
          <Col lg={8} xl={8}>
            <Image
              src={product.image}
              alt="Product Image"
              className="image-container"
            />
          </Col>
          <Col lg={4} xl={4}>
            <Stack gap={0}>
              <div className="">
                <div
                  className="modal show"
                  style={{ display: "block", position: "initial" }}
                >
                  <Modal.Dialog>
                    <Modal.Header>
                      <Modal.Title
                        style={{ color: "green", fontWeight: "bold" }}
                      >
                        ${product.price}
                      </Modal.Title>
                    </Modal.Header>

                    {product.category === "men's clothing" ||
                    product.category === "women's clothing" ? (
                      <Modal.Body>
                        <Form>
                          {["radio"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="S"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                style={{
                                 
                                  cursor: "pointer",
                                }}
                              />
                              <Form.Check
                                inline
                                label="M"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                              <Form.Check
                                inline
                                label="L"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                              <Form.Check
                                inline
                                label="Xl"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                            </div>
                          ))}
                        </Form>
                      </Modal.Body>
                    ) : (
                      <div style={{ padding: 20, fontSize: 16, color: "gray" }}>
                        No sizes available for this category
                      </div>
                    )}
                  </Modal.Dialog>
                </div>
              </div>

              <div className="">
                <div
                  className="modal show"
                  style={{ display: "block", position: "initial" }}
                >
                  <Modal.Dialog>
                    <Modal.Header>
                      <Modal.Title>{product.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p>{product.description}</p>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="outline-info">
                        {product.rating.rate}/5*
                      </Button>
                      <Button variant="outline-info">
                        {product.rating.count}-sold
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </div>
              </div>

              <div className=" py-2">
                <Col>
                  {" "}
                  {cart.some((p) => p.id == product.id) ? (
                    <Button
                      variant="success"
                      className="button-success"
                      onClick={removeFromCart}
                    >
                      Remove Item
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="button-success"
                      onClick={addToCart}
                    >
                      Add To Cart
                    </Button>
                  )}
                </Col>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    )
  );
}


{/*he useLocation hook is a part of the react-router-dom library, which provides a way to access the current location object in a React component. */}
{/*The location object represents the current URL of the application. It contains information about the current route, such as the pathname, search query, hash, and state. */}
