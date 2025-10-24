import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface SignInModalProps {
  showSignInModal: boolean;
  setShowSignInModal: (show: boolean) => void;
}

function SignInModal({ showSignInModal, setShowSignInModal }: SignInModalProps) {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-urban text-2xl font-bold">Welcome Back</h3>
          <p className="text-sm text-muted-foreground">
            Sign in to access your dashboard and manage your account.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <SignInButton
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
              disabled={signInClicked}
              onClick={() => {
                setSignInClicked(true);
                // Close the custom modal when Clerk's modal opens
                setTimeout(() => {
                  setShowSignInModal(false);
                }, 200);
              }}
              className="w-full"
            >
              {signInClicked ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 size-4" />
              )}
              Continue with Google
            </Button>
          </SignInButton>

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

          <SignInButton
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
                  setShowSignInModal(false);
                }, 200);
              }}
            >
              <Icons.user className="mr-2 size-4" />
              Continue with Email
            </Button>
          </SignInButton>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <SignInButton mode="modal">
              <button
                className="font-medium text-black hover:underline"
                onClick={() => {
                  setTimeout(() => {
                    setShowSignInModal(false);
                  }, 200);
                }}
              >
                Sign up here
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return {
    setShowSignInModal,
    SignInModal: () => (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    ),
  };
}
