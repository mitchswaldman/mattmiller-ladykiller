import React from 'react'
import {connect} from 'react-redux'
import {onTick} from './actionCreators'
import {stepKey, bufferKey} from './helpers'
import WAAClock from 'waaclock'
import drumBuffer from './drumBuffer'
import drumConfig from './drumConfig'

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

const previousTriggers = (() => {
	const triggers = {}
	drumConfig.forEach(({type}) => {
		triggers[type] = null
	})
	return triggers
})()

export const playDrumSound = (buffer, controls, deadline, audioCtx) => {
	const source = audioCtx.createBufferSource()
	previousTriggers
	source.buffer = buffer
	source.playbackRate.value = controls.speed.value

	// Set gain
	const gainNode = audioCtx.createGain()
	gainNode.gain.value = controls.level.value
	gainNode.maxValue = controls.level.max
	gainNode.minValue = controls.level.min
	source.connect(gainNode)

	// Set pan
	const panNode = audioCtx.createStereoPanner()
	panNode.pan.value = controls.pan.value
	gainNode.connect(panNode)

	// Set distortion
	// const distortion = audioCtx.createWaveShaper()
	// distortion.curve = makeDistortionCurve(controls.distortion.value)
	// distortion.oversample = '4x'
	// panNode.connect(distortion)

	panNode.connect(audioCtx.destination)
	source.start(deadline)
	return source
}

const stepTrigger = (storeState, deadline, audioCtx, clock) => {
	const {mode, drumBufferState, drumConfig, drumControlState, steps, currentStep} = storeState
	//console.log(`Current step: ${currentStep}`)
	drumConfig.forEach(({type}) => {
		const stepId = stepKey(type, currentStep)

		
		if (steps[stepId]) {
			if (previousTriggers[type] !== null) {
				previousTriggers[type].stop()
			}
			const buffKey = bufferKey(type, mode)
			const controls = drumControlState[type]
			previousTriggers[type] = playDrumSound(drumBuffer[buffKey], controls, deadline, audioCtx)
		}
	})

}

class Sequencer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tickEvent: null,
			currentTempo: null,
			currentStepDivision: null
		}
		this.handleTick = this.handleTick.bind(this)
	}

	handleTick({deadline}) {
		this.props.handleTick()
		this.props.clock.setTimeout(() => {
			stepTrigger(this.props.storeState, deadline, this.props.audioCtx, this.props.clock)
		}, deadline - this.props.audioCtx.currentTime)
	}

	componentWillReceiveProps({storeState: nextStoreState}) {
		// start sequencer
		if (nextStoreState.samplesLoaded && 
			nextStoreState.playing && this.state.tickEvent === null) {
			this.props.clock.start()
			
			const {tempo, stepDivision} = nextStoreState
			const stepDuration = (60 / tempo) * stepDivision * 4

			const tickEvent = this.props.clock.callbackAtTime(this.handleTick, this.props.audioCtx.currentTime + 0.1)
				.repeat(stepDuration)
				.tolerance({late: 0.01})
			return this.setState({tickEvent, currentTempo: tempo, currentStepDivision: stepDivision})
		}

		// stop sequencer 
		if (!nextStoreState.playing && this.state.tickEvent !== null) {
			this.state.tickEvent.clear()
			this.props.clock.stop()
			return this.setState({tickEvent: null, currentTempo: null})
		}

		// tempo change trigger this.props.clock stretch
		if (nextStoreState.samplesLoaded && nextStoreState.playing && 
			(nextStoreState.tempo !== this.state.currentTempo)) {
			this.props.clock.timeStretch(this.props.audioCtx.currentTime, [this.state.tickEvent], this.state.currentTempo / nextStoreState.tempo)
			
			return this.setState({currentTempo: nextStoreState.tempo})
		}

		// step division change trigger this.props.clock stretch
		if (nextStoreState.samplesLoaded && nextStoreState.playing && 
			(nextStoreState.stepDivision !== this.state.currentStepDivision)) {
			this.props.clock.stretch(this.props.audioCtx.currentTime, [this.state.tickEvent], 
				this.state.currentStepDivision / nextStoreState.stepDivision)

			return this.setState({currentStepDivision: nextStoreState.stepDivision})
		}
	}

	shouldComponentUpdate() {
		return false
	}

	render() {
		return false
	}
}

const mapStateToProps = (state) => ({
	storeState: state 
})

const mapDispatchToProps = (dispatch) => ({
	handleTick: () => dispatch(onTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer)