const NullResponse = () => {
  return (
    <div className="grid h-full w-full" style={{ gridTemplateRows: "min-content minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
      <div className="h-full w-full">
        <p className="text-txtprim font-bold text-sm">Response</p>
      </div>
      <div className="pt-2 h-full">
        <div className="h-full flex justify-center items-center">
          <p className="text-txtsec">Enter the URL and click Send to get a response</p>
        </div>
      </div>
    </div>
  );
};

export default NullResponse;
