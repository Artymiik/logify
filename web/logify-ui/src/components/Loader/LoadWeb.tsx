import "./Loader.sass";

const LoadWeb = () => {
  return (
    <>
      <div className="fixed bg-[#00000073] h-screen w-screen">
        <div className="fixed top-[50%] left-[50%]">
          <div id="load__web">
            <div className="load"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadWeb;
