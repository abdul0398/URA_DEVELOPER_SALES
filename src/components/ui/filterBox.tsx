export default function FilterBox({
  select,
  name,
  selected,
  icon,
}: {
  select: JSX.Element;
  name: string;
  selected: string | null;
  icon: JSX.Element;
}) {
  return (
    <div className="border h-full bg-[#ededed] rounded-xl shadow-l">
      <div className="relative w-full h-1/2">
        <div className="absolute flex justify-center items-center w-12 rounded-lg h-12 border top-[-10px] left-5 bg-[#0e4884]">
          {icon}
        </div>
        <div className="absolute right-5 top-5">
          <p className="font-bold text-center text-sm">{name}</p>
          <p className="font-bold text-center">{selected}</p>
        </div>
      </div>
      <hr className="border-1 border-white" />
      <div className="w-full pb-0 lg:p-4 md:p-4 overflow-visible">{select}</div>
    </div>
  );
}
