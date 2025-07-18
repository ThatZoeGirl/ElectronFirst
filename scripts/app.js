const openFileBtn = document.getElementById('openFile');
const playBtn = document.getElementById('playAudio');
const timeDispl = document.getElementById('time');
const infoDiv = document.getElementById('info');

infoDiv.textContent = `Node ${versions.node()} - Electron ${versions.electron()} - Chromium ${versions.chrome()}`;

const audio = new Audio();
let playing = false;

openFileBtn.addEventListener('click', async () => {
    const filePath = await electronAPI.openFile();
    if (filePath){
        audio.src = filePath;
        audio.load();
        playBtn.disabled = false;
        timeDispl.textContent = '00:00 / 00:00';
    }
})

playBtn.addEventListener('click', async () => {
    if (playing) {
        audio.pause();
    } else {
        audio.play();
    }
})

audio.addEventListener('play', async () => {
    playing = true;
    playBtn.textContent = 'Pause';
})

audio.addEventListener('pause', async () => {
    playing = false;
    playBtn.textContent = 'Play';
})

audio.addEventListener('timeupdate', () => {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  timeDispl.textContent = `${current} / ${duration}`;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}