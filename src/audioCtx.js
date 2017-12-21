import WAAClock from 'waaclock'

let audioCtx, clock;
try {
	const AudioContext = window.AudioContext || window.webkitAudioContext
	audioCtx = new AudioContext()
	clock = new WAAClock(audioCtx)
} catch (e) {
	alert("You're browser doesn't support WebAudio. You dummy.")
}

export {audioCtx, clock}