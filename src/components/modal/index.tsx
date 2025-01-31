import { ReactNode } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModalPropsType = {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
};

export function Modal(props: ModalPropsType) {
    const { isOpen, onClose, children } = props;

    function renderContent() {
        if (!isOpen) {
            return null;
        }

        return (
            <div className="bg-[rgba(0,0,0,0.3)] fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
                <div className="bg-white rounded-lg px-4 py-4 relative">
                    <div
                        onClick={onClose}
                        className="cursor-pointer absolute top-2 right-3 text-lg"
                    >
                        <FontAwesomeIcon
                            className="cursor-pointer text-2xl"
                            icon={faClose}
                            onClick={() => onClose()}
                        />
                    </div>
                    <div className="mt-2">{children}</div>
                </div>
            </div>
        );
    }

    return renderContent();
}
