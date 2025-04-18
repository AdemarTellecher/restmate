import { memo } from "react";
import { useCollapse } from "react-collapsed";
import { LuX } from "react-icons/lu";

const CookieDetail = ({ name, cookies }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  function formatCookie(cookieObj) {
    let cookieStr = `${cookieObj.Name}=${cookieObj.Value}; `;

    if (cookieObj.Expires) {
      const expires = new Date(cookieObj.Expires).toUTCString();
      cookieStr += `expires=${expires}; `;
    }

    if (cookieObj.Path) {
      cookieStr += `path=${cookieObj.Path}; `;
    }

    if (cookieObj.Domain) {
      cookieStr += `domain=${cookieObj.Domain}; `;
    }

    if (cookieObj.Secure) {
      cookieStr += "secure; ";
    }

    if (cookieObj.HttpOnly) {
      cookieStr += "HttpOnly; ";
    }

    return cookieStr.trim();
  }
  return (
    <div className="p-2">
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
            <div key={id} className="text-txtprim bg-gray-600/40 p-3 w-full rounded-md mt-2">
              <p className="text-xs break-all break-words">{formatCookie(c)}</p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default memo(CookieDetail);
