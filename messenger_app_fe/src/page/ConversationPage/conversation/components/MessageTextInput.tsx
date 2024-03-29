import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FormEvent, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { socket } from "../../../../utils/socketIntance";
export const MessageTextInput = () => {
  const { conversationId } = useParams();
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiPickerClick = (emojiData: EmojiClickData) => {
    setInputText((inputValue) => inputValue + emojiData.emoji);
  };

  const submitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText !== "") {
      socket.emit("sendMessage", conversationId, inputText);
    }
    setInputText("");
  };

  const handleSendThumbUp = () => {
    socket.emit("sendMessage", conversationId, "[FaThumbsUp]");
  };

  return (
    <div className="w-full h-[70px] bg-mainBgColor self-end py-3 px-5 flex gap-2 justify-center items-center">
      {showEmojiPicker && (
        <div className="absolute right-[10px] bottom-[70px]">
          <EmojiPicker onEmojiClick={onEmojiPickerClick} />
        </div>
      )}
      <span className="relative w-full">
        <form onSubmit={submitMessage}>
          <input
            className=" px-4 py-2 w-full focus:outline-none bg-inputLightBgColor text-darkTextColor rounded-full"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-messengerColor">
          <span className=" flex gap-2">
            <BsEmojiSmileFill style={{ height: "20px", width: "20px", cursor: "pointer" }} onClick={() => setShowEmojiPicker((previous) => !previous)} />
          </span>
        </span>
      </span>
      <span
        className="h-[30px] w-[30px] cursor-pointer"
        onClick={() => {
          handleSendThumbUp();
        }}
      >
        <FaThumbsUp style={{ height: "30px", width: "30px", paddingBottom: "5px", color: "#0098fe" }} />
      </span>
    </div>
  );
};
