import { Button, Modal } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { useState } from "react";

interface DescriptionProps {
  title: string;
  details?: string;
  info?: string | null;
}
function Description(props: DescriptionProps) {
  const { title, details, info } = props;
  const [showInfo, setShowInfo] = useState<string | null>(null);
  return (
    <div>
      <div>
        {title}
        {info && (
          <span
            onClick={() => {
              setShowInfo(info);
            }}
            className="ml-2 border cursor-pointer border-blue-200 text-blue-600 text-xs font-bold rounded-full bg-blue-100 px-2"
          >
            ?
          </span>
        )}
      </div>
      <div className="text-gray-400 text-xs">{details}</div>
      <Modal show={!!showInfo}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div
            style={{ maxHeight: "40vh", overflow: "auto" }}
            className="whitespace-pre-line"
          >
            {info}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end w-full">
            <Button onClick={() => setShowInfo(null)}>Close</Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Description;
