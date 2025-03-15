import React from "react";
import {Modal, ModalBody, ModalContent} from "@heroui/react";
import UserForm from "./UserForm.tsx";
import {User} from "@/types";

interface UserFormModalProps {
    user?: User;
    onClose: () => void;
    isOpen: boolean;
    onSubmit: (user: User, isEdit: boolean) => void;
}
const UserFormModal: React.FC<UserFormModalProps> = ({user, onClose, isOpen, onSubmit}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-xs:h-user-form-mobile overflow-auto">
            <ModalContent>
                <ModalBody className="p-6">
                    <UserForm user={user} onSubmit={onSubmit}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UserFormModal;