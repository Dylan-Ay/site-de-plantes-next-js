import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  // onClick: () => void;
}

const SeeMoreButton = ({ children, color = 'primary' }: Props) => {
  return(
  <button type="button" className={"btn btn-" + color }>{children}</button>
  );
};

export default SeeMoreButton;
