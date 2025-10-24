import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface SignUpModalProps {
  showSignUpModal: boolean;
  setShowSignUpModal: (show: boolean) => void;
}

function SignUpModal({ showSignUpModal, setShowSignUpModal }: SignUpModalProps) {
  const [signUpClicked, setSignUpClicked] = useState(false);

  return (
    <Modal showModal={showSignUpModal} setShowModal={setShowSignUpModal}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-urban text-2xl font-bold">Create Account</h3>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with your new account.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <SignUpButton
            mode="modal"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                modalBackdrop: "bg-black/50 backdrop-blur-sm",
                card: "shadow-xl border-0",
                headerTitle: "text-lg font-semibold",
                formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
                formFieldInput: "border-gray-300 focus:border-black focus:ring-black",
                dividerText: "text-gray-500",
                formButtonReset: "text-gray-600 hover:text-gray-800",
              },
            }}
          >
            <Button
              variant="default"
              disabled={signUpClicked}
              onClick={() => {
                setSignUpClicked(true);
                setTimeout(() => {
                  setShowSignUpModal(false);
                }, 200);
              }}
              className="w-full"
            >
              {signUpClicked ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 size-4" />
              )}
              Continue with Google
            </Button>
          </SignUpButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-secondary/50 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <SignUpButton
            mode="modal"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                modalBackdrop: "bg-black/50 backdrop-blur-sm",
                card: "shadow-xl border-0",
                headerTitle: "text-lg font-semibold",
                formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
                formFieldInput: "border-gray-300 focus:border-black focus:ring-black",
                dividerText: "text-gray-500",
                formButtonReset: "text-gray-600 hover:text-gray-800",
              },
            }}
          >
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setTimeout(() => {
                  setShowSignUpModal(false);
                }, 200);
              }}
            >
              <Icons.user className="mr-2 size-4" />
              Continue with Email
            </Button>
          </SignUpButton>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <SignUpButton mode="modal">
              <button
                className="font-medium text-black hover:underline"
                onClick={() => {
                  setTimeout(() => {
                    setShowSignUpModal(false);
                  }, 200);
                }}
              >
                Sign in here
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function useSignUpModal() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return {
    setShowSignUpModal,
    SignUpModal: () => (
      <SignUpModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    ),
  };
}
