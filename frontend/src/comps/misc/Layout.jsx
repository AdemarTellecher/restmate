import { Bounce, ToastContainer } from "react-toastify";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-svh bg-brand max-h-svh relative overflow-hidden" id="layout">
      <div className="grid h-full" style={{ gridTemplateColumns: "auto 1fr", gridTemplateRows: "minmax(0, 100%)" }}>
        <div id="sidenav">
          <SideBar />
        </div>
        <div className="w-full h-full" style={{ minWidth: 0 }}>
          {children}
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Layout;
