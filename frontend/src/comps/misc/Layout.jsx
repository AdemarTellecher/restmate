import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="h-svh bg-brand max-h-svh">
      <div className="grid h-full" style={{ gridTemplateColumns: "auto 1fr", gridTemplateRows:"minmax(0, 100%)" }}>
        <div id="sidenav">
          <SideBar />
        </div>
        <div className="w-full h-full" style={{ minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
