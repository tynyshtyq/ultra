import React, { FC, ReactNode, HTMLProps } from "react";

const SIZE = {
  l: ["desktop:text-DHeading-L", "phone:text-MHeading-L"],
  m: ["desktop:text-DHeading-M", "phone:text-MHeading-M"],
  s: ["desktop:text-DHeading-S", "phone:text-MHeading-S"],
};

type SizeType = "s" | "m" | "l";

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  children?: ReactNode;
  type: SizeType;
  className?: string;
}

const Heading: FC<HeadingProps> = ({ children, className, type, ...props }) => {
  return (
    <h2
      className={["font-Inter text-Main-Dark", className, ...SIZE[type]].join(" ")}
      {...props}
    >
      {children}
    </h2>
  );
};

export default Heading;
