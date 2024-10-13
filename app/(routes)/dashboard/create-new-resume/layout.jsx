"use client";
import React from "react";
import ResumeTemplate from "../_components/ResumeTemplate";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import useStore from "@/store/useStore";

const layout = ({ children }) => {
  const previousPage = useStore((state) => state.previousPage);
  return (
    <div>
      <Link className="flex w-24  pb-4 group " href={previousPage}>
        <ChevronLeft className="group-hover:text-blue-600" />
        <span className="group-hover:underline group-hover:text-blue-600">
          Go Back
        </span>
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex gap-10 ">
          {children}
          <div className=" rounded w-[40rem]  text-center">
            <Card>
              <ResumeTemplate />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;