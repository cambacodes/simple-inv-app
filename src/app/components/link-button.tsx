import { Button, type ButtonProps } from "antd";
import Link, { type LinkProps } from "next/link";

export interface LinkButtonProps
  extends Omit<ButtonProps, "href">,
    Pick<LinkProps, "href"> {}
export default function LinkButton({
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link passHref href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}
