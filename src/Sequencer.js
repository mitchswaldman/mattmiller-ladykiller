import React from 'react'
import {connect} from 'react-redux'
import {onTick} from './actionCreators'
import {stepKey} from './helpers'
import WAAClock from 'waaclock'

const playDrumSound = (buffer, deadline, audioCtx) => {
	const source = audioCtx.createBufferSource()
	source.buffer = buffer 
	source.connect(audioCtx.destination)
	source.start(deadline)
}

const stepTrigger = (storeState, deadline, audioCtx, clock) => {
	const {mode, drumBufferState, drumConfig, steps, currentStep} = storeState

	drumConfig.forEach(({type}) => {
		const stepId = stepKey(type, currentStep)

		if (steps[stepId]) {
			playDrumSound(drumBufferState[type][mode], deadline, audioCtx)
		}
	})

}

let audioCtx, clock;
try {
	const AudioContext = window.AudioContext || window.webkitAudioContext
	audioCtx = new AudioContext()
	clock = new WAAClock(audioCtx)
} catch (e) {
	alert("You're browser doesn't support WebAudio. You dummy.")
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
		stepTrigger(this.props.storeState, deadline, this.props.audioCtx, this.props.clock)
		this.props.handleTick()
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