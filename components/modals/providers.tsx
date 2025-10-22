"use client";

import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

import { useSignInModal } from "@/components/modals/sign-in-modal";
import { useSignUpModal } from "@/components/modals/sign-up-modal";

export const ModalContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  setShowSignUpModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowSignInModal: () => {},
  setShowSignUpModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { SignUpModal, setShowSignUpModal } = useSignUpModal();

  return (
    <ModalContext.Provider
      value={{
        setShowSignInModal,
        setShowSignUpModal,
      }}
    >
      <SignInModal />
      <SignUpModal />
      {children}
    </ModalContext.Provider>
  );
}
