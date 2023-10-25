import instance from "../index";

const authService = {
  async signup(payload) {
    return instance.post("auth/create", payload);
  },
  async signin(payload) {
    return instance.post("auth/auth", payload);
  },
  async google(payload) {
    return instance.post("auth/google", payload);
  },
};

export default Object.freeze(authService);
