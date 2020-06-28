import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export  function Transition(props) {
    setOpen(true);
    return <Slide {...props} direction="left" />;
    setTimeout(() => setOpen(false),5000)
  }

  
const SnackBarAlert = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Snackbar
        open={open}
        // onClose={handleClose}
        TransitionComponent={Transition}
        message="I love snacks"
        key={'Transition'}
      />
    </div>
  );
}  
export default SnackBarAlert;
