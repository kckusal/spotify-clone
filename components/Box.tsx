import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Box: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
      bg-neutral-900
        rounded-lg
        h-fit
        w-full
      `,
        className
      )}
    >
      {children}
    </div>
  );
};
