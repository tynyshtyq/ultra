import React, { FC, ReactNode, HTMLProps } from "react";

const SIZE = {
  l: ["desktop:!text-DTitle-L", "phone:!text-MTitle-L"],
  s: ["desktop:!text-DTitle-S", "phone:!text-MTitle-S"],
};

type SizeType = "s" | "l";

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  children?: ReactNode;
  type: SizeType;
  className?: string;
}

const Title: FC<TitleProps> = ({ children, className, type, ...props }) => {
  return (
    <h1
      className={["font-Inter", className, ...SIZE[type]].join(" ")}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
