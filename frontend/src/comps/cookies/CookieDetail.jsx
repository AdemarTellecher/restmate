import { memo } from "react";
import { useCollapse } from "react-collapsed";
import { LuX } from "react-icons/lu";

const CookieDetail = ({ name, cookies }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="bg-sec mb-2 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <div {...getToggleProps()} className="text-txtprim grow cursor-pointer">
          <p>{name ? name : ""}</p>
        </div>
        <div className="text-txtprim cursor-pointer hover:text-red-400">
          <LuX />
        </div>
      </div>
      {cookies && cookies.length ? (
        <section {...getCollapseProps()}>
          {cookies.map((c, id) => (
            <div key={id} className="text-txtprim">
              <p>{c.Name}</p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default memo(CookieDetail);
