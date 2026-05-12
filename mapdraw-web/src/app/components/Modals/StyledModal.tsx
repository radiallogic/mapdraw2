import { Paper, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";

export const StyledModal = ({
  children,
  onClose,
  open,
}: {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      hideBackdrop={true}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
          }}
        />

        <Paper
          elevation={8}
          className="
            relative
            w-fit
            max-w-[calc(100vw-2rem)]
            rounded-xl
            p-6
            shadow-xl
            outline-none
          "
          sx={{
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </IconButton>
          {children}
        </Paper>
      </div>
    </Modal>
  );
};
