import React from "react";

const Tab = ({ obj, fxn, currTag }) => {
  return (
    <div
      className={`${
        currTag === obj.tag ? " text-richblack-100" : ""
      } hover:bg-richblack-900 hover:text-richblack-100 flex justify-center items-center`}
    >
      <span
        onClick={() => {
          fxn(obj.tag, obj.courses);
        }}
      >
        {obj.tag}
      </span>
    </div>
  );
};

export default Tab;
