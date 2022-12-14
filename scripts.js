const player = documentQueryselector('.player')
const video = documentQueryselector('.viewer')
const progress = documentQueryselector('.progress')
const progressBar = documentQueryselector('.progress__filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelector('[data-skip]')
const ranges = player.querySelector('.player__slider')

function togglePlay() {
    const method =
        video[video.paused ? 'play' : 'pause']
    video[method]();
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexbasis = `${percent}%`
}
function scrub() {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
