import { Button, Modal } from "flowbite-react";
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
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div
            style={{ maxHeight: "40vh", overflow: "auto" }}
            className="whitespace-pre-line"
          >
            {info}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <Button onClick={() => setShowInfo(null)}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Description;
