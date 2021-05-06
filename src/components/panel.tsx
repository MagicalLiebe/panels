import type { Dispatch, SetStateAction, VFC } from "react";
import { useEffect, useState } from "react";
import { Card } from "src/components/card";
import useSWR from "swr";

type Panel = {
  id: number;
  text: string;
  finished: boolean;
};

type Props = {
  select: number;
  setSelect: Dispatch<SetStateAction<number>>;
};

export const Panels: VFC<Props> = (props) => {
  const [panels, setPanels] = useState<Panel[]>([]);

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
    <div className="flex items-center justify-center flex-wrap max-w-full overflow-y-auto mt-2">
      {panels.map((panel) => {
        return (
          <Card
            key={panel.id}
            text={panel.text}
            selected={panel.id == props.select}
            finished={panel.finished}
            // eslint-disable-next-line react/jsx-handler-names
            onClick={(e) => {
              e.preventDefault();
              props.setSelect(panel.id);
            }}
          />
        );
      })}
    </div>
  );
};
