import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ButtonProps } from "../../customDataTypes/datatypes";

export default function IconLabelButtons({
  name,
  variant,
  icon,
  endIcon,
  className,
  textcolor,
  buttonWidth,
  onClick,
  type,
  fullWidth,
  borderRadius,
}: ButtonProps) {
  return (
    <Stack direction="row">
      <Button
        variant={variant}
        startIcon={icon}
        endIcon={endIcon}
        className={className}
        onClick={onClick}
        style={{
          color: textcolor,
          width: buttonWidth,
          borderRadius: borderRadius,
        }}
        type={type}
        fullWidth={fullWidth}
      >
        {name}
      </Button>
    </Stack>
  );
}
