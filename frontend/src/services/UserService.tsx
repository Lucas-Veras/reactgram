import { api, requestConfig } from "../utils/config";

const profile = async (data: any, token: any) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update user datails
const updateProfile = async (data: any, token: any) => {
  const config = requestConfig("PUT", data, token, true);
  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile
};

export default userService;
