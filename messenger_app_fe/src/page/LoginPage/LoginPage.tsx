import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

export const LoginPage = () => {
  const [nameForm, setNameForm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
