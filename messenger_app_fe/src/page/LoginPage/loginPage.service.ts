import { User } from "../../schema";
import { api } from "../../utils/axiosIntance";

export const loginService = {
  async login(userName: string) {
    const { data } = await api.post<User>("/login", { userName: userName });
    return data;
  },
};
