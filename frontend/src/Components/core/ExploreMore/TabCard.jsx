import React from "react";

const TabCard = ({ courseObj, courseHeading, fxn }) => {
  return (
    <div
      className={`${
        courseObj.heading === courseHeading ? "bg-yellow-50 " : ""
      }  `}
    >
      <div
        className={`${
          courseObj.heading === courseHeading
            ? "bg-pure-greys-5 text-black  "
            : "bg-richblack-800 text-white "
        }  p-8 pb-4 hover:scale-105 transition-all  h-full -translate-x-3.5 -translate-y-3.5 flex flex-col gap-4`}
        onClick={() => {
          fxn(courseObj.heading);
        }}
      >
        <div>
          <h1 className="text-xl font-bold">{courseObj.heading}</h1>
        </div>

        <div>
          <p>{courseObj.description}</p>
        </div>
        <div className="flex justify-between mt-12 border-t-2 border-dashed border-richblue-400 pt-8">
          <div>
            <span>{courseObj.level}</span>
          </div>
          <div>
            <span>{courseObj.lessonNumber} Lessons</span>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TabCard;
