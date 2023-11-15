import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalstorage";
import { User } from "../../schema";
import { loginService } from "./loginPage.service";

export const LoginPage = () => {
  const [nameForm, setNameForm] = useState("");
  const [_, setUser] = useLocalStorage<User | null>("loginUser", null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await loginService.login(nameForm);
    if (user) {
      setUser(user);
      navigate("/");
    }
    console.log(user);
  };
  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className=" text-4xl font-bold text-messengerColor">Login</h1>
      <form className=" flex flex-col gap-4 max-w-[400px] w-full border-2 border-solid border-messengerColor p-5 rounded-3xl" onSubmit={handleSubmit}>
        <TextField label="Name" placeholder="Input your name" value={nameForm} onChange={(e) => setNameForm(e.target.value)} />
        <Button sx={{ backgroundColor: "#0098fe" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
