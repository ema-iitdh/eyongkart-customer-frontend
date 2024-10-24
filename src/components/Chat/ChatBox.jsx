import React from "react";
import { BsChatDots } from "react-icons/bs";

function ChatBox() {
  return (
    <div>
      <div className="fixed bottom-5 right-5 z-50">
        <a
          href="https://www.gupshup.io/whatsapp/optin/?bId=36de9924-8f92-4351-b290-c13ba56483da&bName=ChatHandloom&s=URL&lang=en_US"
          // href="https://wa.me/919378017306?text= Hello"
          target="_blank"
          rel="noreferrer"
        >
          <button
            type="button"
            className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition flex gap-2"
          >
            <BsChatDots size={20} />
            Chat
          </button>
        </a>
      </div>
    </div>
  );
}

export default ChatBox;
