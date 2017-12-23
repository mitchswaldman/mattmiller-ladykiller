import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import {
	onModeClick, 
	onPlayClick,
	onTempoChange
} from '../../actionCreators'
import {
	ConnectedSwitchModeButton,
	ConnectedPlayButton,
	ConnectedTempoControl,
	ConnectedShowHideControlPanel
} from './connectedComponents'

class ControlSection extends React.Component {
	render() {
		const {showControlPanel} = this.props 
		const style = {
			display: 'flex'
		}
		return (
			<div style={style}>
				{showControlPanel && 
					<div>
						<ConnectedSwitchModeButton/>
						<ConnectedPlayButton />
						<ConnectedTempoControl/>
						<ConnectedShowHideControlPanel>
							Hide Control Panel
						</ConnectedShowHideControlPanel>
					</div>
				}
				{!showControlPanel && 
					<div>
						<ConnectedShowHideControlPanel>
							Show Control Panel
						</ConnectedShowHideControlPanel>
					</div>
				}
			</div>)
	}
}

ControlSection.PropTypes = {
	showControlPanel: PropTypes.bool.isRequired
}

export default Radium(ControlSection)