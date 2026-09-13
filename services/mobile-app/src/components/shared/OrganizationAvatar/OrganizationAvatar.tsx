import { Avatar } from "src/components/ui/Avatar/Avatar";

interface OrganizationAvatarProps {
  name?: string;
  size?: number;
  src?: string;
}

export function OrganizationAvatar({
  name,
  size,
  src,
}: OrganizationAvatarProps) {
  return <Avatar name={name} size={size} src={src} />;
}
