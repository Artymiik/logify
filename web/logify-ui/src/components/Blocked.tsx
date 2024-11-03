const Blocked = () => {
  return (
    <>
      <div className="h-screen bg-[] flex flex-col items-center justify-center -mt-[10vw]">
        <div className="text-center">
          <span className="text-[7vw]">🙅🏻‍♂️</span>
          <p className="my-3 max-w-[35vw] text-[1.5rem]">
            Sorry, your balance is zero, the logs are running out of fuel
          </p>
        </div>
      </div>
    </>
  );
};

export default Blocked;
