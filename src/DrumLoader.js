import React from 'react'
import {connect} from 'react-redux'
import {onLoad} from './actionCreators'
import {MODES} from './constants'

const loadDrum = (audioCtx, drumConfig, handleLoad) => {
	MODES.forEach((mode) => {
		var request = new XMLHttpRequest()
		request.open('GET', drumConfig[mode], true)
		request.responseType = 'arraybuffer'
		request.onload = () => {
			audioCtx.decodeAudioData(request.response, (buffer) => {
				handleLoad(drumConfig.type, mode, buffer)
			})
		}
		request.send()
	})
}

class DrumLoader extends React.Component {
	constructor(props) {
		super(props)
		this.handleLoad = this.handleLoad.bind(this)
	}

	componentDidMount() {
		this.props.storeState.drumConfig.forEach((drum) => {
			loadDrum(this.props.audioCtx, drum, this.handleLoad)
		})
	}

	handleLoad(type, mode, buffer) {
		this.props.handleLoad(type, mode, buffer)
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

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleLoad: (type, mode, buffer) => dispatch(onLoad(type, mode, buffer))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrumLoader)