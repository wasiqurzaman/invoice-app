import Image from "next/image";
import ToggleTheme from "./ToggleTheme";

export default function SideBar() {
  return (
    <div className="h-screen w-[100px] bg-sidebar flex flex-col justify-between rounded-r-[20px] overflow-hidden fixed">
      <div className="w-[100px] h-[100px] bg-primary flex items-center justify-center rounded-r-[20px] relative">
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-primary-hover rounded-tl-[20px] rounded-br-[20px]"></div>
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="w-[40px] h-[40px] z-50"
        />
      </div>
      <div>
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <ToggleTheme />
        </div>
        <div className="w-[100px] h-[100px] flex items-center justify-center border-t border-[#494E6E]">
          <Image
            src="/assets/profile.webp"
            alt="profile pic"
            width={200}
            height={200}
            className="w-[40px] h-[40]"
          />
        </div>
      </div>
    </div>
  );
}
