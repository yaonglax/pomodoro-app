import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './styles/ModalSettings.css';
import { AccessAlarm} from '@mui/icons-material';

export default function ModalWindow({time, setTime, setSavedTime, shortBreak, setShortBreakTime, longBreak, setLongBreakTime }) {
  const [open, setOpen] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(Math.floor(time / 60));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTimeChange = () => {
    const newPomodoroTime = pomodoroDuration * 60;
    setTime(newPomodoroTime);
    setSavedTime(newPomodoroTime);
    setShortBreakTime(Number(shortBreak));
    setLongBreakTime(Number(longBreak));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 20,
    p: 4,
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="default">
        <AccessAlarm/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            ТАЙМЕР
          </Typography>
          <div className="schemes">
            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
              Схемы:
            </Typography>
            <div className="schemes__buttons">
              <button onClick={() => {
                setPomodoroDuration(25)
                setSavedTime(25 * 60);
              }}>25 minutes</button>
              <button onClick={() => {
               setPomodoroDuration(45)
               setSavedTime(45 * 60);
              }}>45 minutes</button>
              <button onClick={() => {
                setPomodoroDuration(60)
                setSavedTime(60 * 60);
              }}>60 minutes</button>
            </div>
          </div>
          <div className="duration">
            <div className="duration__session">
              <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                Продолжительность помидора:
              </Typography>
              <input
                type="number"
                className="duration__input input"
                value={pomodoroDuration}
                onChange={(e) => setPomodoroDuration(Number(e.target.value))}
                min='10'
                max='60'
              />
            </div>
            <div className="duration__break">
              <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                Продолжительность короткого перерыва:
              </Typography>
              <input
                type="number"
                className="duration__input input"
                value={shortBreak / 60}
                onChange={(e) => setShortBreakTime(Number(e.target.value) * 60)}
                min='5'
                max='10'
              />
            </div>
            <div className="duration__break">
              <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                Продолжительность длинного перерыва:
              </Typography>
              <input
                type="number"
                className="duration__input input"
                value={longBreak / 60} 
                onChange={(e) => setLongBreakTime(Number(e.target.value) * 60)}
                min='15'
                max='25'
              />
            </div>
          </div>
          <Button onClick={() => {
            handleTimeChange();
            handleClose();
          }}>Сохранить</Button>
        </Box>
      </Modal>
    </div>
  );
}
