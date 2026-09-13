import { Avatar } from "src/components/ui/Avatar/Avatar";

interface ProfileAvatarProps {
  name?: string;
  size?: number;
  src?: string;
}

export function ProfileAvatar({ name, size, src }: ProfileAvatarProps) {
  return <Avatar name={name} size={size} src={src} />;
}