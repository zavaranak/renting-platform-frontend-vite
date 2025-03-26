import { ReactNode } from "react";

interface SideBoxProps {
  children: ReactNode;
}

export const SideBox = ({ children }: SideBoxProps) => {
  return (
    <div className="bg-text_light_panel fixed left-5 top-32">{children}</div>
  );
};
