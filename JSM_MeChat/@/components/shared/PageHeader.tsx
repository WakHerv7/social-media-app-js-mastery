import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  return <h2 className="h3-bold md:h2-bold text-left w-full">{title}</h2>;
};

export default PageHeader;
