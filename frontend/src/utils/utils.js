export const ENVIRONMENT_REGEX = /\{\{([\w.-]+)\}\}/g;
export const extractEnv = (x) => {
  return x.replace(/\{\{([\w.-]+)\}\}/, "$1");
};

export const cleanUpRequest = (t) => {
  if (!t) {
    return t;
  }
  t.headers = t.headers.filter((h) => h.key !== "" && h.active === true);
  t.params = t.params.filter((h) => h.key !== "" && h.active === true);
  t.body.formData = t.body.formData.filter((h) => h.key !== "" && h.active === true);
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

export const restmate_version = "1.01.1";
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
    palettes: ["#0d1016", "#151a23", "#ffbb33"],
  },
  {
    name: "nord",
    palettes: ["#2e3440", "#3b4252", "#8fbcbb"],
  },
  {
    name: "malta",
    palettes: ["#212121", "#262626", "#ff6c37"],
  },
];
