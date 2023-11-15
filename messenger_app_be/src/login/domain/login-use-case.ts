import * as loginRepository from "./../data-access/login-repository.js";

export const loginUser = async (userName: string) => {
  console.log("loginUser , userName:", userName);
  let user = null;
  user = await loginRepository.getUser(userName);
  console.log("loginUser , getUser:", user);

  if (!user) {
    user = await loginRepository.createUser(userName);
    console.log("loginUser , createUser:", user);
  }

  return user;
};
