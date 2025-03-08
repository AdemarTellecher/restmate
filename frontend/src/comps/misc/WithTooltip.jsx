const WithTooltip = ({ text = "text", styles, children }) => {
  return (
    <div className={`group relative ${styles}`}>
      <div className="hidden group-hover:block absolute bottom-0 pt-2 z-10" style={{ transform: "translateY(100%) translateX(-50%)" }}>
        <div className="bg-brand text-lit px-4 rounded-sm text-sm border border-lines text-nowrap">
          <span>{text}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WithTooltip;
