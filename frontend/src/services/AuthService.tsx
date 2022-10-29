import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data: any) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res._id) {
      localStorage.setItem("User", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// login an user
const login = async (data: any) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + `/users/login`, config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (err) {
    console.log(err);
  }
};

const authService = {
  register,
  logout,
  login
};

export default authService;

/*
AuthService.tsx:7          POST http://localhost:5000/api/users/register 422 (Unprocessable Entity)
*/
/*
CfsEWAuD30hHrF4x
*/
