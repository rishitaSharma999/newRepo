import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authapi";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'
import Spinner from "../components/Spinner";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Container>
          <Row>
            <Col>
              <div className="max-w-[500px] p-8">
                <h1
                  className=""
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "rgb(28 46 52)",
                    textShadow: "2px 2px 4px #ccccff",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  Verify Email
                </h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-emerald-200">
                  A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleVerifyAndSignup}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        placeholder="-"
                        style={{
                          width:"10%",
                          borderRadius: "0.5rem",
                          textAlign: "center",
                          outline: "2px solid #ccccff",
                          marginBottom:"25px",

                        }}
                        className=" border-0 bg-blue-600 rounded-[0.5rem]  text-pink-200 aspect-square text-center "
                      />
                    )}
                    containerStyle={{
                      justifyContent: "space-between",
                      gap: "0 6px",
                    }}
                  />
                  <Row>
                    <Col>
                      {" "}
                      
                      <Button
                 type="submit"
                  variant="success"
                  className="button-success"
                  style={{marginTop:"20px",marginBottom:"20px",}}
                >
                  Verify Email
                  </Button>
                    </Col>
                  </Row>
                </form>
                <Row>
                  <Col>
                  <Link to="/signup">
                    <p className="text-blue-100 flex items-center gap-x-2">
                      <BiArrowBack /> Back To Signup
                    </p>
                  </Link>
              

                  <Button
                 type="submit"
                  variant="success"
                  className="button-success"
                  onClick={() => dispatch(sendOtp(signupData.email))}
                >
                  <RxCountdownTimer />
                    Resend it
                  </Button>
                  
                  </Col>
                </Row>
                </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default VerifyEmail;
