import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../../../../../../utils/socketIntance";

type CreateNewConversationModalType = {
  open: boolean;
  handleClose: () => void;
};
type ErrorType = { error?: string; success?: string };

export const CreateNewConversationModal = ({ open, handleClose }: CreateNewConversationModalType) => {
  const [nameForm, setNameForm] = useState("");
  const [messageForm, setMessageForm] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("openConversation", nameForm, messageForm, (response: ErrorType) => {
      if (response.error) {
        toast.error(response.error);
      }
      if (response.success) {
        handleClose();
      }
    });
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Start new conversation</DialogTitle>
      <form className=" flex flex-col gap-4 min-w-[400px] w-full p-5 rounded-3xl" onSubmit={handleSubmit}>
        <TextField label="Name" placeholder="Input name of a friend" value={nameForm} onChange={(e) => setNameForm(e.target.value)} />
        <TextField label="Message" placeholder="Add first message" multiline minRows={3} value={messageForm} onChange={(e) => setMessageForm(e.target.value)} />
        <Button sx={{ backgroundColor: "#0098fe" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Dialog>
  );
};
