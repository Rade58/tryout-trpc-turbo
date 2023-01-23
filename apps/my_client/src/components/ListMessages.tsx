import type { FC, ReactNode } from "react";
import { trpc } from "../utils/trpc";

interface Props {
  children?: ReactNode;
}

const ListMessages: FC<Props> = () => {
  const messages = trpc.message.listMessages.useQuery();

  if (!messages.data) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        {messages.data.map(({ id, text }) => {
          return (
            <div key={id}>
              {id} {text}
            </div>
          );
        })}
      </div>
    );
  }
};

export default ListMessages;
