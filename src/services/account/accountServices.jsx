import instance from "../index";

const authService = {
  async profile() {
    return await instance.get("accounts/profile");
  },
  async logout() {
    return await instance.post("accounts/logout");
  },
};

export default Object.freeze(authService);
