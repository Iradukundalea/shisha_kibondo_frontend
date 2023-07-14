import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { reportBeneficiaryAction } from '../../redux/actions/BeneficialsActions'
import { useDispatch } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
};

export default function BasicModal({ open, handleOpen, handleClose, user}) {
    const dispatch = useDispatch()

    const handleReporting = ()=>{
        console.log('SUBMITTING REPORTING', user)
        dispatch(reportBeneficiaryAction(user.id, handleClose))

    }
    return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slotProps={{
            backdrop: {
              onClick: handleClose,
            },
          }}
       >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report Summary
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            By submitting this report you confirm that it is truthful and made in good faith.
            <Box sx={{ 
                border: 1, 
                mt: 2, 
                padding: 2,
                borderRadius: '4px',
                }}>
                { user.firstName } { user.lastName }
            </Box>
          </Typography>

          <Button 
            onClick={handleReporting}
            sx={{ 
                display: 'flex',
                alignSelf: 'flex-end',
                mt: 2,
                borderRadius: '4px'
            }}
            color="error"
            variant="contained"
            >
            Submit Report
           </Button>

        </Box>
      </Modal>
    </div>
  );
}
