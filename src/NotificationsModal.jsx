import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect, useRef } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import './styles/NotificationsModal.css';
import SongsMenu from './SongsMenu.jsx'

export default function NotificationsModal({ time, timerIsOn }) {
  const [open, setOpen] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [notifyOnEnd, setNotifyOnEnd] = useState(false);
  const [notifyOneMinuteLeft, setNotifyOneMinuteLeft] = useState(false);
  const [tickingSound, setTickingSound] = useState(false);
  const [musicDuringSession, setMusicDuringSession] = useState(false);
  const [selectedSong, setSelectedSong] = useState('/audios/livechat.mp3')

  const [tempNotifyOnEnd, setTempNotifyOnEnd] = useState(notifyOnEnd);
  const [tempNotifyOneMinuteLeft, setTempNotifyOneMinuteLeft] = useState(notifyOneMinuteLeft);
  const [tempTickingSound, setTempTickingSound] = useState(tickingSound);
  const [tempMusicDuringSession, setTempMusicDuringSession] = useState(musicDuringSession);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
      console.log(audioRef.current.src)
    }
  }, [audioVolume]);

  useEffect(() => {
    console.log('Selected song has changed to:', selectedSong);
  }, [selectedSong]);

  const handleOpen = () => {

    setTempNotifyOnEnd(notifyOnEnd);
    setTempNotifyOneMinuteLeft(notifyOneMinuteLeft);
    setTempTickingSound(tickingSound);
    setTempMusicDuringSession(musicDuringSession);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleVolumeChange = (e) => {
    setAudioVolume(e.target.value / 100);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSave = () => {
    setNotifyOnEnd(tempNotifyOnEnd);
    setNotifyOneMinuteLeft(tempNotifyOneMinuteLeft);
    setTickingSound(tempTickingSound);
    setMusicDuringSession(tempMusicDuringSession);
    handleClose();
  };

  const handleTimeEnded = () => {
    if (notifyOnEnd && time === 0) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  const handleOneMinuteLeft = () => {
    if (notifyOneMinuteLeft && time === 60) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }


  handleOneMinuteLeft();
  handleTimeEnded();

  return (
    <div>
      <IconButton onClick={handleOpen} color="default">
        <NotificationsNoneIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            ОПОВЕЩЕНИЯ
          </Typography>
          <div className="volume">
            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
              Громкость:
            </Typography>
            <input
              type="range"
              onMouseUp={handleVolumeChange}
            />
            <SongsMenu onSongSelect={setSelectedSong}></SongsMenu>
          </div>
          <FormControlLabel
            control={<Switch checked={tempNotifyOnEnd} onChange={(e) => setTempNotifyOnEnd(e.target.checked)} />}
            label='Оповещать об окончании:'
            labelPlacement='start'
          />
          <FormControlLabel
            control={<Switch checked={tempNotifyOneMinuteLeft} onChange={(e) => setTempNotifyOneMinuteLeft(e.target.checked)} />}
            label='Оповещать за минуту до конца:'
            labelPlacement='start'
          />
          <FormControlLabel
            control={<Switch checked={tempTickingSound} onChange={(e) => setTempTickingSound(e.target.checked)} />}
            label='Тикающий звук:'
            labelPlacement='start'
          />
          <FormControlLabel
            control={<Switch checked={tempMusicDuringSession} onChange={(e) => setTempMusicDuringSession(e.target.checked)} />}
            label='Музыка во время сессии:'
            labelPlacement='start'
          />
          <Button onClick={handleSave}>Сохранить</Button>
        </Box>
      </Modal>

      <audio ref={audioRef} src={selectedSong} />
    </div>
  );
}
