const progressBar = document.getElementById('progress-bar');
const song = document.getElementById('song');
const playPouseBtn = document.getElementById('play-pouse');
const playPauseIcon = document.getElementById('play-pause-icon');
const volumeUp = document.getElementById('volume-high');
const volumeDown = document.getElementById('volume-low');
const showVolume = document.getElementById('show-volume');
const silentIcon = document.getElementById('silent-icon');
const thumbImg = document.getElementById('thumb-img');



song.onloadedmetadata = () => {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

function playPouse() {
    if (playPauseIcon.classList.contains('fa-play')) {
        song.play();
        thumbImg.classList.add('anim');
        playPauseIcon.classList.add('fa-pause');
        playPauseIcon.classList.remove('fa-play');
    } else {
        song.pause();
        thumbImg.classList.remove('anim');
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');

    }
}

if (song.play()) {
    setInterval(() => {
        progressBar.value = song.currentTime;
    }, 1);

}

progressBar.oninput = () => {
    song.play();
    thumbImg.classList.add('anim');
    song.currentTime = progressBar.value;
    playPauseIcon.classList.add('fa-pause');
    playPauseIcon.classList.remove('fa-play');
}
song.onended = () => {
    thumbImg.classList.remove('anim');
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}
volumeUp.onclick = () => {
    if (song.volume < 1.0) {
        song.volume = Math.min(song.volume + 0.1, 1.0)
    }
    updateVolumeDisplay()
}

volumeDown.onclick = () => {
    if (song.volume > 0.0) {
        song.volume = Math.max(song.volume - 0.1, 0.0)
    }
    updateVolumeDisplay()
}




function updateVolumeDisplay() {
    showVolume.textContent = `${Math.round(song.volume * 100)}%`;

}
updateVolumeDisplay();


silentIcon.onclick = () => {
    const silentBtn = document.getElementById('silent-btn');
    if (song.volume > 0.0) {
        song.volume = 0.0;
        silentBtn.style.backgroundColor = 'red';
    } else if (song.volume <= 0.0) {
        song.volume = 0.3;
        silentBtn.style.backgroundColor = '';
    }
    updateVolumeDisplay()
}

