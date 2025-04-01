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
