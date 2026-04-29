import Image from "next/image";
import DrawCircleText from "./ui/ProvidebannerText";

const ProvideBanner = () => {
  return (
    <div className="px-20 w-full pt-4 pb-20 flex justify-between items-center">
      <div className="w-1/2 flex justify-center items-center overflow-hidden">
        <div className="relative w-full h-[350px] rounded-4xl overflow-hidden">
          <Image
            src={
              "https://images.unsplash.com/photo-1617696618050-b0fef0c666af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            fill
            alt="img"
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-between items-center">
        <DrawCircleText/>
      </div>
    </div>
  );
};

export default ProvideBanner;