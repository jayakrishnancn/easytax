import { Button, Modal } from "flowbite-react";
import { FlowbiteSizes } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  title?: string | React.ReactNode;
  onCancel: () => void;
  footerItems?: ReactNode;
  size?: keyof FlowbiteSizes;
}
function DetailedModal(props: Props) {
  const { children, title, onCancel, footerItems, size = "xl" } = props;
  return (
    <Modal show={true} size={size} onClose={onCancel}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
          {children}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full">
          <div className="text-right mb-2">{footerItems}</div>
          <div className="flex justify-end">
            <Button color="gray" onClick={onCancel}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailedModal;
