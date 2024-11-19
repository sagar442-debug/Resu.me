import { SignUp } from "@clerk/nextjs";
import React from "react";
export const runtime = "edge";

const page = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] ">
      <SignUp />
    </div>
  );
};

export default page;
