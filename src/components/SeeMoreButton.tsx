import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  href?: string;
}

function SeeMoreButton ({ children, href }: Props) {
  if (href) {
    return (
      <Link href={href} passHref className={"px-4 py-2 rounded font-semibold text-sm bg-green-600 text-white shadow-sm"}>{children}</Link>
    )
  }
};

export default SeeMoreButton;
