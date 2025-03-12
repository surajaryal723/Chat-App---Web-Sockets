import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

function App() {
  return (
    <>
      <div className="w-full h-screen  flex flex-col items-center py-10">
        <div className="w-[40%] h-screen overflow-y-scroll p-4 flex flex-col gap-2 ">
          <ChatBubble variant="receive" text="Hello" />
          <ChatBubble variant="send" text="Hello" />
          <div className="flex flex-col gap-4 gap-2 w-full mt-10">
            <input
              placeholder="Write your message"
              type="text"
              className="px-4 py-6 outline-none bg-[#F2F2F2] w-full rounded-md"
            />
            <button className="bg-black text-white w-fit px-4 py-2 rounded-sm cursor-pointer">Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
