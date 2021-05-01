import type { VFC } from "react";
import { useEffect, useState } from "react";
import { Card } from "src/components/card";
import { Layout } from "src/components/layout";
import { supabase } from "src/lib/supabaseClient";
import useSWR from "swr";

type Panels = {
  id: number;
  text: string;
  selected: boolean;
  finished: boolean;
};

const Home: VFC = () => {
  const [newText, setNewText] = useState<string>("");
  const [panels, setPanels] = useState<Panels[]>([]);

  const handleClick = async () => {
    if (newText.trim() != "") {
      await supabase.from("panels").insert([{ text: newText }]);
      setNewText("");
    }
  };

  const fetcher = async (url: string) => {
    const panelData = await fetch(url).then((res) => {
      return res.json();
    });
    return panelData.panels;
  };

  const { data } = useSWR("/api/data", fetcher, { refreshInterval: 1000 });

  const update = async () => {
    if (data) {
      setPanels(data);
    }
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Layout>
      <form className="mt-4 flex justify-center h-12">
        <input
          type="text"
          className="w-80 mr-2 text-center border-2 border-gray-700"
          value={newText}
          // eslint-disable-next-line react/jsx-handler-names
          onChange={(e) => {
            e.preventDefault();
            setNewText(e.target.value);
          }}
        />
        <button
          className="px-4 w-auto border-2 rounded-md border-gray-700"
          // eslint-disable-next-line react/jsx-handler-names
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Send
        </button>
      </form>
      <div className="flex items-center justify-center flex-wrap max-w-full mt-12 overflow-y-auto">
        {panels.map((panel) => {
          return (
            <Card
              key={panel.id}
              text={panel.text}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
