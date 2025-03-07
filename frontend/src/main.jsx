import { createRoot } from "react-dom/client";
import "./index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
