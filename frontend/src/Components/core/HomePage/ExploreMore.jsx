// import React from "react";
// import { HomePageExplore } from "../../../data/homepage-explore.js";
// import HighlightText from "./HighlightText";
// import { useState } from "react";
// import CourseCard from "./CourseCard";

// const tabsName = [
//   "Free",
//   "New to coding",
//   "Most popular",
//   "Skills paths",
//   "Career paths",
// ];

// const ExploreMore = () => {
//   const [currentTab, setCurrentTab] = useState(tabsName[0]);
//   const [courses, setCourses] = useState(HomePageExplore[0].courses);
//   const [currentCard, setCurrentCard] = useState(
//     HomePageExplore[0].courses[0].heading
//   );

//   const setMyCards = (value) => {
//     setCurrentTab(value);
//     const result = HomePageExplore.filter((course) => course.tag === value);
//     setCourses(result[0].courses);
//     setCurrentCard(result[0].courses[0].heading);
//     console.log(result[0].courses);
//   };

//   return (
//     <div className="">
//       <div className="text-3xl font-semibold text-center lg:text-4xl">
//         Unlock the
//         <HighlightText text={"Power of Code"} />
//       </div>

//       <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
//         Learn to build anything you can imagine
//       </p>

//       <div
//         className="mt-5 flex flex-row rounded-full bg-richblack-800 mb-3 border-richblack-100
//       px-1 py-1"
//       >
//         {tabsName.map((element, index) => {
//           return (
//             <div
//               className={` text-[13px] lg:text-[16px] flex flex-row items-center gap-2
//                 ${
//                   currentTab === element
//                     ? "bg-richblack-900 text-richblack-5 font-medium"
//                     : "text-richblack-200"
//                 } rounded-full transition-all duration-200 cursor-pointer
//                 hover:bg-richblack-900 hover:text-richblack-5 text-center px-3 py-1 lg:px-7 lg:py-2`}
//               key={index}
//               onClick={() => setMyCards(element)}
//             >
//               {element}
//             </div>
//           );
//         })}
//       </div>

//       {/* <div className='lg:h-[150px]'></div> */}

//       {/* course card ka group */}

//       {/* <div className=" flex gap-9 w-full justify-center mt-5 flex-wrap lg:absolute right-0 left-0 mr-auto ml-auto">
//         {courses.map((element, index) => {
//           return (
//             <CourseCard
//               key={index}
//               cardData={element}
//               currentCard={currentCard}
//               setCurrentCard={setCurrentCard}
//             />
//           );
//         })}
//       </div> */}
//     </div>
//   );
// };

// export default ExploreMore;

import React from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/HomePageExplore";
import { useState } from "react";
import Tab from "../ExploreMore/Tab";
import TabCard from "../ExploreMore/TabCard";

const ExploreMore = () => {
  const [currTag, setCurrTag] = useState(HomePageExplore[0].tag);
  const [currCourses, setCurrentCourses] = useState(HomePageExplore[0].courses);
  const [currCourse, setCurrCourse] = useState(currCourses[0].heading);

  const handelTabOnClick = (tag, courses) => {
    setCurrTag(tag);
    setCurrentCourses(courses);
    setCurrCourse(courses[0].heading);
  };

  const handelCardOnClick = (heading) => {
    setCurrCourse(heading);
  };

  return (
    <div className="mb-2">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text">
          <span>Unloack The</span>
          <HighlightText text="Power Of Code" />
        </div>
        <p className="text-sm text-richblack-100">
          Learn To Build Anything You Can Imagine
        </p>
        <div className="mt-5  flex flex-row rounded-full gap-8 bg-richblack-800 mb-3 border-richblack-100 px-4 py-1 mt-8">
          {HomePageExplore.map((e, key) => (
            <Tab key={key} fxn={handelTabOnClick} obj={e} currTag={currTag} />
          ))}
        </div>
      </div>
      <div className="flex z-1 lg:flex-row flex-col gap-12 md:translate-y-20 mt-8">
        {currCourses.map((course, i) => (
          <TabCard
            key={i}
            courseObj={course}
            courseHeading={currCourse}
            fxn={handelCardOnClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
