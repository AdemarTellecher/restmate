import { LuCookie } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { dumbcookie } from "../../utils/utils";
import ModalLayout from "../misc/ModalLayout";
import CustomButton from "../misc/CustomButton";
import CookieDetail from "./CookieDetail";

const CookieModal = () => {
  const cookieModal = useStore((x) => x.cookieModal);
  console.log("cookie modal --> ", cookieModal);
  const setCookieModal = useStore((x) => x.setCookieModal);
  const [cks, setCks] = useState(null);
  const getCooks = async () => {
    // let r = await GetAllCookies();
    let r = dumbcookie;
    if (r && r.length) {
      let group = r.reduce((acc, obj) => {
        const k = obj.Domain;
        if (!acc[k]) {
          acc[k] = [];
        }
        acc[k].push(obj);
        return acc;
      }, {});
      setCks(group);
      // setCks(null);
    } else {
      setCks(null);
    }
  };
  useEffect(() => {
    getCooks();
  }, []);
  return (
    <ModalLayout open={cookieModal} onClose={() => setCookieModal(false)} title="Cookies" size="xl">
      <div className="h-full p-4 overflow-y-auto" style={{ maxHeight: "800px", height: "400px" }}>
        {cks && typeof cks === "object" && Object.keys(cks).length ? (
          <div>
            {Object.keys(cks).map((x, id) => (
            <CookieDetail key={id} name={x} cookies={cks[x]} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center py-6 gap-y-4 text-txtsec">
            <LuCookie size="96" />
            <div>
              <p className="text-sm mb-1 text-txtprim">Cookie Jar is empty.</p>
              <p className="text-sm text-txtprim">No Cookies available!</p>
            </div>
            <CustomButton name="Close" clx="px-4 py-1" onClick={() => setCookieModal(false)} />
          </div>
        )}
        {/*
      <div className="p-4 text-lit overflow-y-auto" style={{ maxHeight: "800px" }}>
        {[...Array(40).keys()].map((x) => (
          <div key={x} className="pb-2">
            <p>coookkiiieeeee - {x}!!!</p>
          </div>
        ))}
      </div>
      */}
      </div>
    </ModalLayout>
  );
};

export default CookieModal;
