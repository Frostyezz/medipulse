import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMesssage($input: SendMessageInput!) {
    sendMessage(input: $input)
  }
`;

const ChatPage = () => {
  const [chats, setChats] = useState<{ sender: any; message: any }[]>([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");

    channel.bind("chat-event", function (data: any) {
      console.log(data);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ variables: { input: { chatId: "sda", content: "daaa" } } });
  };

  return (
    <>
      <p>Hello</p>
      <div>
        {chats.map((chat, id) => (
          <>
            <p>{chat.message}</p>
            <small>{chat.sender}</small>
          </>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="start typing...."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatPage;
