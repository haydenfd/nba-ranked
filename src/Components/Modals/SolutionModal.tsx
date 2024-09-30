import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface SolutionModalProps {
  correctGuesses: number;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ correctGuesses, isOpen, onOpenChange }) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top" size="3xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Solution Modal</ModalHeader>
            <ModalBody>
              <p>You got {correctGuesses} right!</p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
