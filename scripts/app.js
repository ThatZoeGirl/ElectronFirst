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
        if(playing){
            await togglePlayback()
            while(playing) await new Promise((resolve) => setTimeout(resolve, 100));
        }
        audio.src = filePath;
        audio.load();
        playBtn.disabled = false;
        timeDispl.textContent = '00:00 / 00:00';
    }
})

playBtn.addEventListener('click', async () => {
    togglePlayback();
})

audio.addEventListener('play', async () => {
    console.log("called start");
    playing = true;
    playBtn.textContent = 'Pause';
})

audio.addEventListener('pause', async () => {
    console.log("called stop");
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

async function togglePlayback(){
    console.log('called', playing);
    if (playing) {
        audio.pause();
    } else {
        audio.play();
    }
    return;
}

(async () =>{
    setInterval(() => {console.log(playing), 100});
})();