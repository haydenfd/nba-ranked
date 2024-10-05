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
            <ModalHeader className={`${correctGuesses === 5 ? "text-green-600" : "text-red-400"} text-center text-2xl font-bold flex flex-1 flex-col`}>
            {
                  correctGuesses === 5? "You won!": "You lost!"
            }
            </ModalHeader>
            <ModalBody>
              {
                correctGuesses === 5? "" : (
                  <>
                    
                  </>
                )
              }
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
