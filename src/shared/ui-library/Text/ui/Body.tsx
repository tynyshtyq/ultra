import React, { FC, ReactNode, HTMLProps } from "react";

interface BodyProps extends HTMLProps<HTMLParagraphElement> {
  children?: ReactNode;
  className?: string;
}

const Body: FC<BodyProps> = ({ children, className, ...props }) => {
  return (
    <p className={["font-Inter", className, ...["desktop:text-DBody-L", "phone:text-MBody-L"]].join(" ")} {...props}>
      {children}
    </p>
  );
};

export default Body;
