import { ProfileImage } from "../../../compoments/ProfileImage";
import { ConversationHeader } from "./components/ConversationHeader";

const MESSAGES = [
  {
    user: "user1",
    message: "Non aute est quis.",
    created: new Date("11/12/2008 12:12"),
  },
  { user: "user1", message: "Nulla sunt nisi dolore ipsum nisi veniam adipisicing anim culpa excepteur officia et ad.", created: new Date("11/12/2008 12:15") },
  {
    user: "user2",
    message: "Esse eiusmod est deserunt.",
    created: new Date("11/12/2008 13:12"),
  },
  {
    user: "user2",
    message:
      "Exercitation amet anim non aute est quis elit aute pariatur aute. Aliquip incididunt Minim laboris laboris elit. Irure aliqua Lorem ea nostrud dolore veniam proident.",
    created: new Date("11/12/2008 13:13"),
  },
  {
    user: "user2",
    message: "Anim veniam sunt excepteur.",
    created: new Date("11/12/2008 13:14"),
  },
];

const LOGGED_IN_USER = "user1";

export const Conversation = () => {
  console.log(MESSAGES);
  return (
    <div className="w-full h-full p-3 bg-mainBgColor flex flex-col">
      <ConversationHeader />
      <div className=" h-full flex flex-col-reverse gap-2">
        {MESSAGES.map((obj, index) => {
          const isNewUser = index > 0 && MESSAGES[index - 1].user !== obj.user;
          const isLoggedInUser = obj.user === LOGGED_IN_USER;

          return (
            <div className={` flex ${isLoggedInUser ? "justify-end" : "justify-start"} ${isNewUser && "mb-4"}`}>
              {isNewUser && <ProfileImage />}
              <div
                className={` ${isLoggedInUser ? "bg-messengerColor" : " bg-inputLightBgColor"} ${
                  isNewUser ? "ml-2" : "ml-[48px]"
                } rounded-[25px] py-2 px-4 max-w-[55%] `}
                key={obj.created + obj.message}
              >
                {obj.message}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
