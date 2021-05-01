import type { VFC } from "react";

type Props = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Card: VFC<Props> = (props) => {
  return (
    <button
      className="m-4 p-6 w-96 h-30 text-center border-2 border-gray-600 rounded-lg hover:bg-blue-200 hover:border-blue-400 focus:bg-red-200 focus:border-8 focus:border-red-400"
      // eslint-disable-next-line react/jsx-handler-names
      onClick={props.onClick}
    >
      <h3 className="w-auto h-auto text-2xl truncate">{props.text}</h3>
    </button>
  );
};
