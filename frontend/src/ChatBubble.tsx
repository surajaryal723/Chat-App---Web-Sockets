export interface ChatBubbleProps {
  variant: "send" | "receive";
  text: string;
}

const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <div
      className={`w-[100%] p-4 ${
        props.variant === "receive" ? "bg-[#F2F2F2] rounded-[8px] rounded-bl-none" : "bg-[#F9E4CB] rounded-[8px] rounded-br-none"
      } `}
    >
      <span>{props.text}</span>
    </div>
  );
};

export default ChatBubble;
