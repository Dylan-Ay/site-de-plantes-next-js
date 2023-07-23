import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  href?: string;
}

const SeeMoreButton = ({ children, color = 'primary', href }: Props) => {
  if (href) {
    return (
      <Link href={href} passHref className={"btn btn-" + color}>{children}</Link>
    )
  }
};

export default SeeMoreButton;
