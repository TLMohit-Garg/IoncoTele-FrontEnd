import React, { useState } from 'react';

const PopoverExample = () => {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <button onClick={togglePopover}>Click me</button>

      {showPopover && (
        <div style={{ position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',}}>
          <p>This is a popover content!</p>
        </div>
      )}
    </div>
  );
};

const popoverStyle = {
  position: 'absolute',
  top: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  zIndex: '1000',
};

export default PopoverExample;