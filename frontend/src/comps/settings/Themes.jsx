import { useStore } from "../../store/store";
import { colors } from "../../utils/utils";

const Themes = () => {
  const st = useStore((x) => x.settings.theme);
  const applyTheme = async (x) => {
    useStore.getState().setSettings("theme", x);
  };
  return (
    <div className="px-6 pb-4 overflow-y-auto">
      <p className="text-txtprim font-bold">Themes</p>
      <p className="text-sm text-txtsec">Personalize your experience with themes that match your style.</p>
      <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-4 mt-4">
        {colors.map((c, i) => (
          <div
            key={i}
            className={`group cursor-pointer hover:bg-lit rounded-md pt-6 pb-4 ${st === c.name ? "bg-lit text-black" : "bg-sec text-txtprim"}`}
            onClick={() => applyTheme(c.name)}
          >
            <div className="flex justify-center items-center gap-x-1 px-6">
              {c.palettes.map((p, j) => (
                <div key={j} style={{ background: p }} className="size-6 rounded-full"></div>
              ))}
            </div>
            <div className="text-center mt-3">
              <p className="text-xs font-bold capitalize group-hover:text-black">{c.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;
