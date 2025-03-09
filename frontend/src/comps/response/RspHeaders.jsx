import React from "react";

const RspHeaders = ({ headers }) => {
  return (
    <div className="grid h-full pt-2" style={{ gridTemplateRows: "min-content minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
      <p className="text-txtsec font-bold text-sm">Headers List</p>
      <div className="h-full w-full pt-2">
        <div className="h-full overflow-y-auto text-txtprim border border-lines text-sm">
          {headers &&
            headers.map((h, id) => (
              <div key={id} className="flex items-cetner border-b border-lines py-2 last:border-none">
                <div className="basis-1/2 border-r border-lines px-2 font-bold">
                  <p>{h.key}</p>
                </div>
                <div className="basis-1/2 px-2">
                  <p>{h.value}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RspHeaders);
