"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaMapMarker } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { MdDownloadForOffline } from "react-icons/md";
import useStore from "@/store/useStore";

const ResumeTemplate = forwardRef((props, ref) => {
  const resumeRef = useRef();
  const [initialTap, setInitialTap] = useState(false);

  const userFullName = useStore((state) => state.userFullName);
  const userEmailAddress = useStore((state) => state.userEmailAddress);
  const userPhoneNumber = useStore((state) => state.userPhoneNumber);
  const userWebsite = useStore((state) => state.userWebsite);
  const userAddress = useStore((state) => state.userAddress);
  const userDegree = useStore((state) => state.userDegree);
  const userLanguage = useStore((state) => state.userLanguage);
  console.log(userLanguage);

  // const generateText = async () => {
  //   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //   const prompt =
  //     "Please provide me the list of skills required for Next js developer position. Provide me a list with a comma after each skill and don't jump on another line just keep on write it in just a sentence without changing line.Also do not mention any additional text before and after the list. I don't need any of your recommendation. Also do not provide any brackets please!!";

  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  // };
  // useEffect(() => {
  //   generateText();
  // }, []);

  // Handle file change
  const handleDownloadPdf = async () => {
    setInitialTap(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const input = resumeRef.current;
    await html2canvas(input, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 page width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, null, "FAST");

      pdf.save("resume.pdf");
    });
    setInitialTap(false);
  };
  return (
    <div className="">
      <div
        ref={ref}
        className={!initialTap ? "resume-template" : "hidden resume-template"}
      >
        <div className="title pb-5 mb-2 border-b text-center mt-2">
          <h1 className="text-2xl tracking-widest">
            {userFullName.length > 3 ? userFullName : "Sagar Sapkota"}
          </h1>
          <p className="text-xs font-medium mt-2 tracking-wide">
            Software developer
          </p>
        </div>
        <div className="flex border-b pb-4">
          {/* Left side */}
          <div className="left-side min-w-52 bg-[#dbdbdb] pl-4 pr-6 py-2">
            <section className="contact section text-left border-b border-[#adadad] h-36">
              <h1 className="font-bold mb-2 tracking-widest">Contact</h1>
              <ul className="text-xs space-y-2 ">
                <li className="flex gap-2 items-center">
                  <FaPhone size={10} className="" />
                  <span className="text-[10px]">
                    {userPhoneNumber.length > "3"
                      ? userPhoneNumber
                      : "403-123-1234"}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <IoIosMail />
                  <span className="text-[9px]">
                    {userEmailAddress.length > 3
                      ? userEmailAddress
                      : "sagarsapkota0987@gmail.com"}
                  </span>
                </li>
                {userWebsite.length > 3 ? (
                  <li className="flex gap-2 ">
                    <CiGlobe className="" />

                    <span className="text-[10px]">{userWebsite}</span>
                  </li>
                ) : (
                  ""
                )}

                {userAddress.length > 3 ? (
                  <li className="flex gap-2 ">
                    <FaMapMarker size={10} className="mt-0.5" />

                    <span className="text-[10px]"> {userAddress}</span>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </section>
            <section className="skills-section text-left my-3 border-b pb-3 mb-2 border-[#adadad]">
              <h1 className="font-bold mb-2 tracking-widest">Skills</h1>
              <ul className="text-xs grid gap-1 grid-cols-3">
                <li className="flex ">
                  <span>Sql</span>
                </li>
                <li className="">
                  <span>React</span>
                </li>
                <li className="">
                  <span>TailwindCss</span>
                </li>
                <li className="">
                  <span>NextJs</span>
                </li>
                <li className="">
                  <span>Testing</span>
                </li>
                <li className="">
                  <span>ExpressJs</span>
                </li>
                <li className="">
                  <span>C#</span>
                </li>
                <li className="">
                  <span>Java</span>
                </li>
              </ul>
            </section>
            <section className="skills-section text-left mt-3 border-b border-[#adadad] pb-4">
              <h1 className="font-bold mb-2 tracking-widest">Education</h1>
              <ul className="text-xs space-y-6 ">
                {userDegree.map((degree, i) => (
                  <li key={i} className="flex flex-col ">
                    <span>{degree.degreeName}</span>
                    <span className="text-sm font-bold tracking-tighter">
                      {degree.degreeInstitution}
                    </span>
                    <span>{degree.degreeEndDate}</span>
                    <p className="mt-1">{degree.shortDesc}</p>
                  </li>
                ))}

                {userDegree.length === 0 ? (
                  <li className="flex flex-col ">
                    <span>Degree Name</span>
                    <span className="text-sm font-bold tracking-tighter">
                      Institution Name
                    </span>
                    <span>2024-08-08</span>
                    <p className="mt-1">
                      You will be able to see the updated degree in next page!
                    </p>
                  </li>
                ) : (
                  ""
                )}
                {/* <li className="flex flex-col ">
                  <span>Degree Name</span>
                  <span className="text-sm font-bold tracking-tighter">
                    Institution Name
                  </span>
                  <span>2024-08-08</span>
                  <p className="mt-1">
                    Completed ABC degree in XYZ field. Did reasearch on ABC
                    topic and presented it in XYZ conference.
                  </p>
                </li>
                <li className="flex flex-col ">
                  <span>Degree Name</span>
                  <span className="text-sm font-bold tracking-tighter">
                    Institution Name
                  </span>
                  <span>2024-08-08</span>
                  <p className="mt-1">
                    Completed ABC degree in XYZ field. Did reasearch on ABC
                    topic and presented it in XYZ conference.
                  </p>
                </li> */}
              </ul>
            </section>
            <section className="language-section text-left mt-3  border-[#adadad] pb-2 ">
              <h1 className="font-bold mb-2 tracking-widest">Language</h1>
              <ul className="text-xs space-y-2 ">
                {userLanguage.map((language, i) => (
                  <li className="flex gap-2 items-center justify-between  ">
                    <span>{language.languageName}</span>
                    <div className="w-full bg-gray-700/20 rounded-full h-2">
                      <div
                        className="bg-gray-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${language.languagePercentage}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          {/* Right side */}
          <div className="other-details ml-2 py-2">
            <div className="profile h-36 text-left border-b">
              <h1 className="text-base font-semibold tracking-wider mb-2">
                Profile
              </h1>
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, sit! Porro dolorum reprehenderit eius nulla,
                eligendi facere reiciendis distinctio, assumenda cupiditate
                earum voluptatibus placeat! Mollitia nihil aspernatur voluptas
                saepe animi, reiciendis voluptatum nemo eveniet voluptates
                dolorum? Natus nihil reiciendis adipisci?
              </p>
            </div>
            <div className="profile mt-3 text-left  ml-4">
              <h1 className="text-sm font-semibold tracking-wider ">
                Work Experience
              </h1>
              <div className="experience-1 mb-10">
                <h1 className="text-sm my-2">Your Job Position Here</h1>
                <span className="flex justify-between my-2 mr-4">
                  <h1 className="text-xs tracking-tighter">Company Name</h1>
                  <h1 className="text-xs">2020-2024</h1>
                </span>
                <ol className="text-xs tracking-tighter space-y-1 list-disc">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure vitae praesentium quis ab quod veniam optio tenetur
                    quam fuga. Est?
                  </li>
                  <li>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure, accusamus obcaecati eaque ex dolorum
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, molestiae harum provident nostrum incidunt
                    suscipit dolorem, repellat animi veniam similique?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque, qui!
                  </li>
                </ol>
              </div>
              <div className="experience-1 mb-4">
                <h1 className="text-sm my-2">Your Job Position Here</h1>
                <span className="flex justify-between my-2 mr-4">
                  <h1 className="text-xs tracking-tighter">Company Name</h1>
                  <h1 className="text-xs">2020-2024</h1>
                </span>
                <ol className="text-xs tracking-tighter space-y-1 list-disc">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure vitae praesentium quis ab quod veniam optio tenetur
                    quam fuga. Est?
                  </li>
                  <li>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure, accusamus obcaecati eaque ex dolorum
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, molestiae harum provident nostrum incidunt
                    suscipit dolorem, repellat animi veniam similique?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque, qui!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={resumeRef} className={initialTap ? "" : "hidden"}>
        <div className="title pb-5 mb-2 border-b">
          <h1 className="text-2xl tracking-widest">Sagar Sapkota</h1>
          <p className="text-xs font-medium mt-2 tracking-wide">
            Software developer
          </p>
        </div>
        <div className="flex border-b pb-4">
          {/* Left side */}
          <div className="left-side w-52 bg-[#dbdbdb] pl-4 pr-6 py-2">
            <section className="contact section text-left border-b border-[#adadad] h-36">
              <h1 className="font-bold mb-2 tracking-widest">Contact</h1>
              <ul className="text-xs space-y-2 ">
                <li className="flex gap-2 justify-start items-center">
                  <span className="h-4 w-4 pt-2">
                    <FaPhone className="" />
                  </span>
                  <span>403-688-3933</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="h-4 w-4 pt-2">
                    <IoIosMail className="" />
                  </span>
                  <span>sagar@gmail.com</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="h-4 w-4 pt-2">
                    <CiGlobe className="" />
                  </span>
                  <span>sagarspk.com.np</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="h-4 w-4 pt-2">
                    <FaMapMarker className="" />
                  </span>
                  <span>196 Whitehaven rd</span>
                </li>
              </ul>
            </section>
            <section className="skills-section text-left my-3 border-b pb-3 mb-2 border-[#adadad]">
              <h1 className="font-bold mb-2 tracking-widest">Skills</h1>
              <ul className="text-xs grid gap-1 grid-cols-3">
                <li className="flex ">
                  <span>Sql</span>
                </li>
                <li className="">
                  <span>React</span>
                </li>
                <li className="">
                  <span>TailwindCss</span>
                </li>
                <li className="">
                  <span>NextJs</span>
                </li>
                <li className="">
                  <span>Testing</span>
                </li>
                <li className="">
                  <span>ExpressJs</span>
                </li>
                <li className="">
                  <span>C#</span>
                </li>
                <li className="">
                  <span>Java</span>
                </li>
              </ul>
            </section>
            <section className="skills-section text-left mt-3 border-b border-[#adadad] pb-4">
              <h1 className="font-bold mb-2 tracking-widest">Education</h1>
              <ul className="text-xs space-y-6 ">
                <li className="flex flex-col ">
                  <span>Degree Name</span>
                  <span className="text-sm font-bold tracking-tighter">
                    Institution Name
                  </span>
                  <span>2024-08-08</span>
                  <p className="mt-1">
                    Completed ABC degree in XYZ field. Did reasearch on ABC
                    topic and presented it in XYZ conference.
                  </p>
                </li>
                <li className="flex flex-col ">
                  <span>Degree Name</span>
                  <span className="text-sm font-bold tracking-tighter">
                    Institution Name
                  </span>
                  <span>2024-08-08</span>
                  <p className="mt-1">
                    Completed ABC degree in XYZ field. Did reasearch on ABC
                    topic and presented it in XYZ conference.
                  </p>
                </li>
              </ul>
            </section>
            <section className="language-section text-left mt-3 border-b border-[#adadad] pb-2 ">
              <h1 className="font-bold mb-2 tracking-widest">Language</h1>
              <ul className="text-xs space-y-2 ">
                <li className="flex gap-2 items-center justify-between  ">
                  <span>English</span>
                  <Progress
                    className="h-[6px] mt-4 w-28 bg-gray-700/10"
                    value={96}
                    indicatorColor={"bg-gray-700"}
                  />
                </li>
                <li className="flex gap-2 items-center justify-between ">
                  <span>French</span>
                  <Progress
                    className="h-[6px] mt-4 w-28 bg-gray-700/10 "
                    value={80}
                    indicatorColor={"bg-gray-700"}
                  />
                </li>
                <li className="flex gap-2 items-center justify-between  ">
                  <span>Spanish</span>
                  <Progress
                    className="h-[6px] mt-4 w-28 bg-gray-700/10"
                    value={77}
                    indicatorColor={"bg-gray-700"}
                  />
                </li>
              </ul>
            </section>
          </div>
          {/* Right side */}
          <div className="other-details ml-2 py-2">
            <div className="profile h-36 text-left border-b">
              <h1 className="text-base font-semibold tracking-wider mb-2">
                Profile
              </h1>
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, sit! Porro dolorum reprehenderit eius nulla,
                eligendi facere reiciendis distinctio, assumenda cupiditate
                earum voluptatibus placeat! Mollitia nihil aspernatur voluptas
                saepe animi, reiciendis voluptatum nemo eveniet voluptates
                dolorum? Natus nihil reiciendis adipisci?
              </p>
            </div>
            <div className="profile mt-3 text-left ">
              <h1 className="text-sm font-semibold tracking-wider ">
                Work Experience
              </h1>
              <div className="experience-1 mb-10">
                <h1 className="text-sm my-2">Your Job Position Here</h1>
                <span className="flex justify-between my-2 mr-4">
                  <h1 className="text-xs tracking-tighter">Company Name</h1>
                  <h1 className="text-xs">2020-2024</h1>
                </span>
                <ol className="text-xs tracking-tighter space-y-1">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure vitae praesentium quis ab quod veniam optio tenetur
                    quam fuga. Est?
                  </li>
                  <li>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure, accusamus obcaecati eaque ex dolorum
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, molestiae harum provident nostrum incidunt
                    suscipit dolorem, repellat animi veniam similique?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque, qui!
                  </li>
                </ol>
              </div>
              <div className="experience-1 mb-4">
                <h1 className="text-sm my-2">Your Job Position Here</h1>
                <span className="flex justify-between my-2 mr-4">
                  <h1 className="text-xs tracking-tighter">Company Name</h1>
                  <h1 className="text-xs">2020-2024</h1>
                </span>
                <ol className="text-xs tracking-tighter space-y-1">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure vitae praesentium quis ab quod veniam optio tenetur
                    quam fuga. Est?
                  </li>
                  <li>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure, accusamus obcaecati eaque ex dolorum
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, molestiae harum provident nostrum incidunt
                    suscipit dolorem, repellat animi veniam similique?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque, qui!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResumeTemplate;
