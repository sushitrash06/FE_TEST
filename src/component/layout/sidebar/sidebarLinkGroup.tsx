import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li className='text-[#001429]'>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
