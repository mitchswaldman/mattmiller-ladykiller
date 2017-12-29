import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
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
			display: 'flex',
			height: '100%'
		}
		return (
			<div style={{width: '100%'}}>
				{showControlPanel && 
					<div style={style}>
						<div style={{flex: '0 1'}}>
							<p style={{padding: '10px'}}>
								Matt Miller Lady Killer
							</p>
						</div>
						<div style={{flex: 3}}>
							<ConnectedTempoControl/>
						</div>
						<div style={{flex: 1}}>
							<ConnectedPlayButton />
						</div>
						<div style={{flex: 1}}>
							<ConnectedSwitchModeButton/>
						</div>
					</div>
				}
				{!showControlPanel && 
					<div style={style}>
						<ConnectedShowHideControlPanel>
							Show Control Panel
						</ConnectedShowHideControlPanel>
					</div>
				}</div>)
	}
}

ControlSection.propTypes = {
	showControlPanel: PropTypes.bool.isRequired
}

export default Radium(ControlSection)