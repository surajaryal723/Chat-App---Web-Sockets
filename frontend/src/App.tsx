import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

function App() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8080');
    setWs(wss);

    wss.onopen = () => {
      wss.send(JSON.stringify({
        type: 'join',
        payload: { roomId: '123123' }
      }));
    };

    wss.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]); // ✅ Use functional update
      console.log('Received:', event.data);
    };

    return () => {
      wss.close();
    };
  }, []);

  function sendMessage() {
    if (ws && formRef.current.value.trim() !== "") {
      ws.send(JSON.stringify({
        type: 'chat',
        payload: { message: formRef.current.value }
      }));
      formRef.current.value = ""; // Clear input after sending
    } else {
      alert("WebSocket not connected or message is empty");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center py-10">
      <div className="w-[40%] h-screen overflow-y-scroll p-4 flex flex-col gap-2">
        {messages.map((msg, index) => (
          <ChatBubble key={index} variant="receive" text={msg} />
        ))}

        <div className="flex flex-col gap-4 w-full mt-10">
          <input
            placeholder="Write your message"
            type="text"
            className="px-4 py-6 outline-none bg-[#F2F2F2] w-full rounded-md"
            ref={formRef}
          />
          <button
            className="bg-black text-white w-fit px-4 py-2 rounded-sm cursor-pointer"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
