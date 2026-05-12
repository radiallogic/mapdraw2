"use client";

import { StyledModal, ModalProps } from "./StyledModal";
import { Stack } from "@mui/material";

export default function LoginModal({ open, handleClose }: ModalProps) {
  return (
    <StyledModal open={open} onClose={handleClose}>
      <Stack spacing={3}>
        <>
          Planning an adventure is an odd thing, too much detail and you take
          the fun and spontinaity out of it. But not enough planning has the
          same danger. As does forgetting which place your friend said did the
          good beer.
        </>
      </Stack>
    </StyledModal>
  );
}
