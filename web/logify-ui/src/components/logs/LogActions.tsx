const LogActions = ({ siteName, logName, action, download }: any) => {
  const handleDelete = () => {
    action(siteName, logName);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleDownload = () => {
    const blob = download(siteName, logName);
    const url = window.URL.createObjectURL(blob);

    // Создаем ссылку для скачивания
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "log_user.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Отменяем объект URL
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="absolute right-10 -mt-[1vw] flex mr-4 justify-end">
        <div className="bg-[#13111c] w-[200px] min-h-[100px] rounded-lg border border-[#33323e]">
          <div className="p-3">
            <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-[#211f2d]">
              <p
                className="text-[#fff] text-[14px] ml-3"
                onClick={handleDownload}
              >
                Download
              </p>
            </div>
            <div
              className="flex items-center cursor-pointer p-2 rounded-md hover:bg-[#211f2d]"
              onClick={handleDelete}
            >
              <p className="text-[#fff] text-[14px] ml-3 text-[#ff4242]">
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogActions;
