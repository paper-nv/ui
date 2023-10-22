import instance from "../index";

const authService = {
  async profile() {
    return await instance.get("accounts/profile");
  },
};

export default Object.freeze(authService);
