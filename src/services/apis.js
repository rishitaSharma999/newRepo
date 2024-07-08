const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact",
};

export const paymentEndPoint = {
  PAYMENT_ORDER_API: BASE_URL + "/order",
  PAYMENT_STATUS_API: BASE_URL + "/status",
};

//It's a constant that defines the root URL for all API endpoints. In this case, it's http://localhost:4000/api/v1, which means that all API endpoints will start with this URL.
