import React from "react";
import { LuCircle, LuCircleCheckBig, LuPlus, LuTrash2 } from "react-icons/lu";
import { useStore } from "../../store/store";

const ReqParams = ({ tabId, params }) => {
  const updateParam = useStore((x) => x.updateParams);
  const deleteParam = useStore((x) => x.deleteParam);
  const addParam = useStore((x) => x.addParam);
  return (
    <div className="pt-2 h-full grid" style={{ gridTemplateRows: "min-content fit-content(100%) min-content" }}>
      <div className="">
        <p className="text-txtsec text-sm font-bold">Query Params</p>
      </div>
      {params && params.length ? (
        <div className="mt-2 border border-lines overflow-y-auto overflow-x-hidden">
          {params.map((p) => (
            <div key={p.id} className="flex items-center border-b border-lines last:border-none h-10">
              <div className="border-r border-lines grow h-full">
                <input
                  value={p.key}
                  className="outline-none text-txtprim text-sm px-2 w-full h-full focus:text-lit focus:bg-sec"
                  placeholder="key"
                  maxLength="99"
                  onChange={(e) => updateParam(tabId, p.id, "key", e.target.value)}
                />
              </div>
              <div className="grow h-full">
                <input
                  value={p.value}
                  className="outline-none text-txtprim text-sm px-2 w-full h-full focus:text-lit focus:bg-sec"
                  placeholder="value"
                  maxLength="999"
                  onChange={(e) => updateParam(tabId, p.id, "value", e.target.value)}
                />
              </div>
              <div
                className="h-full flex items-center px-2 hover:bg-sec cursor-pointer border-x border-lines"
                onClick={() => updateParam(tabId, p.id, "active", !p.active)}
              >
                {p.active ? <LuCircleCheckBig className="text-green-500" /> : <LuCircle className="text-txtsec" />}
              </div>
              <div className="h-full flex items-center px-2 hover:bg-sec cursor-pointer" onClick={() => deleteParam(tabId, p.id)}>
                <LuTrash2 className="text-red-500" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {!params.length || (params.length && params[params.length - 1].key !== "" && params.length < 20) ? (
        <div className="flex mt-2">
          <div className="flex items-center gap-x-1 text-txtsec text-sm font-bold cursor-pointer hover:text-accent" onClick={() => addParam(tabId)}>
            <LuPlus size="16" />
            <p>New</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ReqParams);
