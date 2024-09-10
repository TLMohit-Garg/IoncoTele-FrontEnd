import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogContent, DialogContentText, Grid } from "@mui/material";

export default function FullScreenDialog({
  open,
  onClose,
  content,
  direction,
  className,
  PaperProps,
  dialogClassName,
  scroll,
}: any) {
  const [transitionApplied, setTransitionApplied] = React.useState(false);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    if (!transitionApplied) {
      setTransitionApplied(true);
      return (
        <Slide
          direction={direction}
          className={className}
          ref={ref}
          {...props}
        />
      );
    }

    return <>{props.children}</>;
  });
  return (
    <Grid>
      <Dialog
        PaperProps={PaperProps}
        fullScreen
        open={open}
        scroll={scroll}
        className={dialogClassName}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={() => {
          onClose();

          setTransitionApplied(false);
        }}
        TransitionComponent={Transition}
      >
        <DialogContent
          dividers={scroll === "paper"}
          style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}
        >
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
