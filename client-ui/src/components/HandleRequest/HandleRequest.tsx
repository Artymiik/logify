import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import "./HandleRequest.sass";

interface Props {
  status_code: number | null;
  message: string;
}

export const HandleRequest = (props: Props) => {
  if (props.status_code === null) return;
  const statusCode = props.status_code.toString();

  return (
    <>
      <div id="handle">
        {statusCode.startsWith("2") ? (
          <div className="elements__handle success">
            <CircleCheck size={17} color="#03d903" strokeWidth={1.75} />
            <p>{props.message}</p>
          </div>
        ) : statusCode.startsWith("3") ? (
          <div className="elements__handle redirect">
            <CircleAlert size={17} color="#d98303" strokeWidth={1.75} />
            <p>{props.message}</p>
          </div>
        ) : (
          <div className="elements__handle error">
            <CircleX size={17} color="#d90303" strokeWidth={1.75} />
            <p>{props.message}</p>
          </div>
        )}
      </div>
    </>
  );
};
