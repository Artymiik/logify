import { ResponseDetailsLog } from "../../types/types";

interface Props {
  index: number;
  detailsLog: ResponseDetailsLog[];
}

const ShowMoreDetails = (props: Props) => {
  return (
    <>
      <div
        className="border-l border-[#33323e] pl-6 ml-12 my-2 mb-2 hidden"
        id={`details-log-${props.index}`}
      >
        {props.detailsLog.length > 0 && (
          <ul>
            {Object.keys(props.detailsLog[props.index]).map((key) => (
              <li key={key} style={{ display: "block" }}>
                <span className="text-[13px] tracking-wide text-[#5e8eed]">
                  {key}:{" "}
                </span>
                <span className="text-[13px] tracking-wide text-[#eac153]">
                  {
                    props.detailsLog[props.index][
                      key as keyof ResponseDetailsLog
                    ]
                  }
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ShowMoreDetails;
