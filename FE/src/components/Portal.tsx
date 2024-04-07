import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal = (props: PortalProps) => {
  const { children, id } = props;
  return createPortal(children, document.getElementById(id) as HTMLElement);
};
export default Portal;
