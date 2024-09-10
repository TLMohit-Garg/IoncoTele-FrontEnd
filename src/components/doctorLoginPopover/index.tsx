import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function LoginPopover() {
  const[showpopover, setshowPopover] = React.useState<HTMLButtonElement | null>(null)
  const[initialstate, setState] = React.useState<HTMLButtonElement | null>(null);
const handleClick =(event:React.MouseEvent<HTMLButtonElement>) => {
  setshowPopover(event.currentTarget)
}
const closePopover = () => {
  setshowPopover(null);
}
const openPopover = Boolean(showpopover);
const popoverid = openPopover ? "simple-popover" : undefined;

const clickonPopover =(onclickevent:React.MouseEvent<HTMLButtonElement>) =>{
    setState(onclickevent.currentTarget);
}
const popoverClose =()=>{
  setState(null);
}
const popoverOpen = Boolean(initialstate);
  return (
    <div>
      <Button  variant="contained" onClick={handleClick} aria-describedby={popoverid}>
        Open Popover
      </Button>
      <Button variant='outlined' onClick={clickonPopover}>New POPover</Button>
      <Popover
       open={openPopover}
       onClose={closePopover}
       anchorEl={showpopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id={popoverid}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <Popover
      open ={popoverOpen}
      onClose ={popoverClose}
      anchorEl={initialstate}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      >
      <Typography sx={{ p: 2 }}>The content of the new   Popover.</Typography>

      </Popover>
    </div>
  );
}
