import React from "react";

const PingLoader = () => {
  return (
    <div className="flex justify-around w-[200px] mx-auto my-14">
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-ping"></div>
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-pulse"></div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-ping"></div>
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-pulse"></div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-ping"></div>
          <div class="w-6 h-6 bg-primary rounded-full absolute left-0 top-0 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PingLoader;
