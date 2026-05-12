"use client";

import Button from "@mui/material/Button";
import { StyledModal } from "./StyledModal";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert, Stack, Typography } from "@mui/material";

type LoginModalProps = {
  open: boolean;
  handleClose: () => void;
};

const GoogleSignIn = () => {
  const handle = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <Button fullWidth variant="outlined" onClick={handle}>
      Sign in with Google
    </Button>
  );
};

const FacebookSignIn = () => {
  const handle = async () => {
    await signIn("facebook", {
      callbackUrl: "/",
    });
  };

  return (
    <Button fullWidth variant="outlined" onClick={handle}>
      Sign in with Facebook
    </Button>
  );
};

const getAuthError = (error: string) => {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "This email is already linked to another sign-in method.";
    case "AccessDenied":
      return "Access was denied.";
    case "Configuration":
      return "There is a server configuration problem.";
    default:
      return "Sign in failed.";
  }
};

export default function LoginModal({ open, handleClose }: LoginModalProps) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <StyledModal open={open} onClose={handleClose}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h5" component="h1" fontWeight={700}>
            Sign in
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Create an adventure
          </Typography>
        </div>

        {error && (
          <Alert severity="error" variant="outlined">
            {getAuthError(error)}
          </Alert>
        )}

        <Stack spacing={1.5}>
          <GoogleSignIn />
          <FacebookSignIn />
        </Stack>
      </Stack>
    </StyledModal>
  );
}
