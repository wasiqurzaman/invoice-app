"use client";
import React, { useEffect, useState } from "react";

import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IoSunny className="w-[30px] h-[30px] cursor-pointer" />;
  }

  if (resolvedTheme === "dark")
    return (
      <IoSunny
        className="w-[30px] h-[30px] cursor-pointer"
        onClick={() => setTheme("light")}
      />
    );
  if (resolvedTheme === "light")
    return (
      <IoMoon
        color="#fff"
        className="w-[30px] h-[30px] cursor-pointer"
        onClick={() => setTheme("dark")}
      />
    );
}
