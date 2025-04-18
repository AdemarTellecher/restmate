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

export const dumbcookie = [
  {
    Name: "accessToken",
    Value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NDQ3NjAwNzIsImV4cCI6MTc0NDc2MzY3Mn0.mFRPm9A_48vDJbJasDnMKevDZpJRhR_Jt-n_l9XSe70",
    Domain: "dummyjson.com",
    Path: "/",
    Secure: true,
    HttpOnly: true,
    Persistent: true,
    HostOnly: true,
    Expires: "2025-04-16T05:34:32.763938644+05:00",
    Creation: "2025-04-16T04:22:13.225636689+05:00",
    LastAccess: "2025-04-16T04:34:32.763938644+05:00",
    Updated: "2025-04-16T04:34:32.763938644+05:00",
    CanonicalHost: "dummyjson.com",
  },
  {
    Name: "refreshToken",
    Value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NDQ3NjAwNzIsImV4cCI6MTc0NzM1MjA3Mn0.t-6FuIPNFPLkG8hZbs900iNQThEcm4OFv8akbTkqO6Y",
    Domain: "dummyjson.com",
    Path: "/",
    Secure: true,
    HttpOnly: true,
    Persistent: true,
    HostOnly: true,
    Expires: "2025-04-16T05:34:32.763938644+05:00",
    Creation: "2025-04-16T04:22:13.225636689+05:00",
    LastAccess: "2025-04-16T04:34:32.763938644+05:00",
    Updated: "2025-04-16T04:34:32.763938644+05:00",
    CanonicalHost: "dummyjson.com",
  },
  {
    Name: "jwt_token",
    Value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJmeW5leC1hcHAiLCJleHAiOjE3NDQ4MDMyNzIsImlhdCI6MTc0NDc2MDA3Mn0.WgDDuqlwTbycaMnvrXTYa1CQtYiSntfS9A1KcQ9FQ5E",
    Domain: "localhost",
    Path: "/api",
    Secure: false,
    HttpOnly: false,
    Persistent: true,
    HostOnly: true,
    Expires: "2025-04-16T00:34:32Z",
    Creation: "2025-04-16T03:01:31.760415518+05:00",
    LastAccess: "2025-04-16T04:34:32.768730809+05:00",
    Updated: "2025-04-16T04:34:32.768730809+05:00",
    CanonicalHost: "localhost",
  },
  {
    Name: "jwt_token2",
    Value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJmeW5leC1hcHAiLCJleHAiOjE3NDQ4MDMyNzIsImlhdCI6MTc0NDc2MDA3Mn0.WgDDuqlwTbycaMnvrXTYa1CQtYiSntfS9A1KcQ9FQ5E",
    Domain: "localhost",
    Secure: false,
    HttpOnly: false,
    Persistent: true,
    HostOnly: true,
    Expires: "2025-04-16T00:34:32Z",
    Creation: "2025-04-16T03:01:31.760415518+05:00",
    LastAccess: "2025-04-16T04:34:32.768730809+05:00",
    Updated: "2025-04-16T04:34:32.768730809+05:00",
    CanonicalHost: "localhost",
  },
];
