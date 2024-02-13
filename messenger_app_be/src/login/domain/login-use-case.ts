import * as loginRepository from "./../data-access/login-repository.js";

export const loginUser = async (userName: string) => {
  let user = null;
  user = await loginRepository.getUser(userName);

  if (!user) {
    user = await loginRepository.createUser(userName);
  }

  return user;
};
