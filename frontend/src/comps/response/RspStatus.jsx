const RspStatus = ({ status, duration, httpStatus }) => {
  const statusColor = (code) => {
    let cls = "text-xs font-bold";
    if (code >= 200 && code < 300) {
      return `${cls} text-green-500`;
    } else if (code >= 400 && code < 600) {
      return `${cls} text-red-500`;
    } else {
      return `${cls} text-yellow-500`;
    }
  };
  return (
    <div className="flex justify-end items-center gap-x-4 pb-1">
      <div className="flex justify-start items-center gap-x-2">
        <p className="text-xs text-txtsec">Status:</p>
        <p className={statusColor(status)}>{httpStatus}</p>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <p className="text-xs text-txtsec">Time:</p>
        <p className="text-xs text-txtprim font-bold">{duration}</p>
      </div>
    </div>
  );
};

export default RspStatus;
