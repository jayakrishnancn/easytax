import { Button, Modal } from "flowbite-react";
import { FlowbiteSizes } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";
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
    <Modal popup={true} show={true} size={size} onClose={onCancel}>
      {title && (
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5">
          <h3 className="flex-1 text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            onClick={onCancel}
          >
            <MdClose />
          </button>
        </div>
      )}
      <Modal.Body>
        <div className="space-y-6 overflow-auto" style={{ maxHeight: "40vh" }}>
          {children}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col justify-end items-end w-full">
          <div className="mb-2">{footerItems}</div>
          <Button color="gray" onClick={onCancel}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailedModal;
