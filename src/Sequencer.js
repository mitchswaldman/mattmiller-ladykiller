import React from 'react'
import {connect} from 'react-redux'
import {onTick} from './actionCreators'
import {stepKey, bufferKey} from './helpers'
import WAAClock from 'waaclock'
import drumBuffer from './drumBuffer'
import drumConfig from './drumConfig'

const previousTriggers = (() => {
	const triggers = {}
	drumConfig.forEach(({type}) => {
		triggers[type] = null
	})
	return triggers
})()

const playDrumSound = (buffer, deadline, audioCtx) => {
	const source = audioCtx.createBufferSource()
	previousTriggers
	source.buffer = buffer 
	source.connect(audioCtx.destination)
	source.start(deadline)
	return source
}

const stepTrigger = (storeState, deadline, audioCtx, clock) => {
	const {mode, drumBufferState, drumConfig, steps, currentStep} = storeState
	//console.log(`Current step: ${currentStep}`)
	drumConfig.forEach(({type}) => {
		const stepId = stepKey(type, currentStep)

		
		if (steps[stepId]) {
			if (previousTriggers[type] !== null) {
				previousTriggers[type].stop()
			}
			const buffKey = bufferKey(type, mode)
			previousTriggers[type] = playDrumSound(drumBuffer[buffKey], deadline, audioCtx)
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