import { useContext } from "react";
import { MyContext } from "@/context/context";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";
import { IncludeEC } from "@/types/context";

export default function EC() {
  const { includeEC, setIncludeEC } = useContext(MyContext);

  const handleSelect = (e: any) => {
    const val = e.value;

    if (val === "ALL") {
      setIncludeEC(IncludeEC.All);
    } else if (val === "EC") {
      setIncludeEC(IncludeEC.EC);
    } else {
      setIncludeEC(IncludeEC.NonEC);
    }
  };

  const options = [
    {
      value: "ALL",
      label: "Select ALL",
    },
    {
      value: "EC",
      label: "EC",
    },
    {
      value: "Non-EC",
      label: "Non-EC",
    },
  ];

  return (
    <div className="w-45">
      {/* <h2 className="text-center text-xl">Select Blocks</h2> */}
      <WindowedSelect
        placeholder="Select Block"
        options={options}
        value={{ value: includeEC, label: includeEC }}
        windowThreshold={50}
        styles={customStyles}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}
