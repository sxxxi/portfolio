import { AspectRatio, Button, Icon, Image } from "@chakra-ui/react";

interface IconButtonProps {
  icon: string,
  href?: string,
  width?: number
}

export default function IconButton({ icon, width, href }: IconButtonProps) {
  return <a href={href} target="blank">
    <Image src={icon} width={(width) ? width : 60} />
  </a>
}