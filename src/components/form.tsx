import type { VFC } from "react";
import { useState } from "react";
import { supabase } from "src/lib/supabaseClient";

export const Form: VFC = () => {
  const [newText, setNewText] = useState<string>("");

  const handleClick = async () => {
    if (newText.trim() != "") {
      await supabase.from("panels").insert([{ text: newText }]);
      setNewText("");
    }
  };

  return (
    <form className="mt-6 mr-2 ml-2 flex justify-center h-12">
      <input
        type="text"
        className="w-96 mr-2 text-gray-500 text-center border-2 border-gray-500"
        value={newText}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={(e) => {
          e.preventDefault();
          setNewText(e.target.value);
        }}
      />
      <button
        className="px-4 w-auto border-2 rounded-md text-gray-500 border-gray-500"
        // eslint-disable-next-line react/jsx-handler-names
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        Send
      </button>
    </form>
  );
};
