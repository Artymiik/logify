import { Link } from "react-router-dom";

interface Props {
  money: number;
}
const MoneyDetails = (props: Props) => {
  return (
    <>
      <div id="money__action" className="absolute z-10">
        <div className="bg-[#13111c] w-[250px] min-h-[150px] rounded-lg border border-[#33323e]">
          <div className="p-3">
            <p className="text-[#a1a0ab] text-[12px] mb-2">Money</p>
            <div
              id="bg-money"
              className="bg-[transparent] h-[60px] border border-[#1c362a] flex flex-col justify-center rounded-lg"
            >
              <div
                id="bg-in-money"
                className="bg-[#161d1a] w-[222px] h-[58px] -z-2 absolute p-3 rounded-lg"
              ></div>
              <p className="text-center text-[#42946e] relative z-10">
                $ <span>{props.money.toFixed(2)}</span>
              </p>
              <p className="text-center text-[#42946e] text-[11px] relative tracking-wide z-10">
                the tariff plan
              </p>
            </div>
            <p className="text-[11px] text-center tracking-wide my-3 text-[#a1a0ab]">
              This timeline shows how much more our services can be used. to
              extend, buy from or activate conects
            </p>
            <Link to="/">
              <p className="text-center border border-[#1c362a] w-full rounded text-[#42946e] text-[13px] p-1 hover:bg-[#161d1a] transition">
                Buy conects
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyDetails;
