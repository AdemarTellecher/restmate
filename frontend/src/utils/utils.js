export const ENVIRONMENT_REGEX = /\{\{([\w.-]+)\}\}/g;
export const extractEnv = (x) => {
  return x.replace(/\{\{([\w.-]+)\}\}/, "$1");
};

export const cleanUpRequest = (t) => {
  if (!t) {
    return t;
  }
  t.headers = t.headers && t.headers.filter((h) => h.key !== "" && h.active === true);
  t.params = t.params && t.params.filter((h) => h.key !== "" && h.active === true);
  t.body.formData = t.body.formData && t.body.formData.filter((h) => h.key !== "" && h.active === true);
  if (t.body?.bodyType === "json") {
    t.body.formData = [];
  }
  if (t.body?.bodyType === "formdata") {
    t.body.bodyRaw = "";
  }
  if (t.body?.bodyType === "none") {
    t.body.bodyRaw = "";
    t.body.formData = [];
  }
  return t;
};

export const hotkeys_json = [
  //comps/misc/SideBar.jsx
  {
    name: "Toggle Sidebar",
    key: ["Ctrl", "B"],
  },
  {
    name: "New Collection",
    key: ["Ctrl", "N"],
  },
  //comps/TabsRoot.jsx
  {
    name: "New Tab",
    key: ["Ctrl", "T"],
  },
  {
    name: "Next Tab",
    key: ["Ctrl", "Right"],
  },
  {
    name: "Previous Tab",
    key: ["Ctrl", "Left"],
  },
  //comps/ReqHead.jsx
  {
    name: "Save Request",
    key: ["Ctrl", "S"],
  },
  {
    name: "Invoke Request",
    key: ["Ctrl", "Enter"],
  },
  {
    name: "Close Tab",
    key: ["Ctrl", "W"],
  },
];
export const colors = [
  {
    name: "restmate",
    palettes: ["#212121", "#262626", "#6366fb"],
  },
  {
    name: "dracula",
    palettes: ["#282a36", "#2e303e", "#ff61ba"],
  },
  {
    name: "ayu",
    palettes: ["#0d1016", "#151a23", "#df9e1c"],
  },
  {
    name: "nord",
    palettes: ["#2e3440", "#3b4252", "#8fbcbb"],
  },
  {
    name: "malta",
    palettes: ["#212121", "#262626", "#ff6c37"],
  },
  {
    name: "tokyoNight",
    palettes: ["#16161f", "#1a1b27", "#c53b53"],
  },
];
