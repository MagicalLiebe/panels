import type { VFC } from "react";

type Props = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
  finished: boolean;
};

export const Card: VFC<Props> = (props) => {
  if (props.finished) {
    return (
      <button
        className="m-4 p-6 w-96 h-36 text-center rounded-lg bg-gray-200 border-2 border-gray-400"
        onClick={props.onClick}
      >
        <h3 className="text-gray-500 w-auto h-auto text-2xl line-clamp-3">{props.text}</h3>
      </button>
    );
  } else {
    if (props.selected) {
      return (
        <button
          className="m-4 p-6 w-96 h-36 text-center rounded-lg bg-red-200 border-4 border-red-400"
          onClick={props.onClick}
        >
          <h3 className="text-gray-500 w-auto h-auto text-2xl line-clamp-3">{props.text}</h3>
        </button>
      );
    } else {
      return (
        <button
          className="m-4 p-6 w-96 h-36 text-center border-2 border-gray-500 rounded-lg hover:bg-blue-200 hover:border-blue-400"
          onClick={props.onClick}
        >
          <h3 className="text-gray-500 w-auto h-auto text-2xl line-clamp-3">{props.text}</h3>
        </button>
      );
    }
  }
};
