import React from 'react'
import Radium from 'radium'
import drumConfig from '../../drumConfig'
import {connect} from 'react-redux'
import {getDrumPanel, getControlPanel} from '../../selectors'
import {
	TOTAL_STEPS
} from '../../constants'

import PadSection from '../PadSection'
import ControlSection from '../ControlSection'
import DrumSection from '../DrumSection'
const APP_MIN_WIDTH = 600
const APP_MIN_HEIGHT = 400
const APP_PADDING = 40;


class AppLayout extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (this.props.showDrumPanel !== nextProps.showDrumPanel) ||
				(this.props.showControlPanel !== nextProps.showControlPanel);
	}
	
	render() {
		const {showDrumPanel, showControlPanel} = this.props 
		const styles = {
			pageWrapper : {
				position: 'relative',
				width: '100%', height: '100%',
				minWidth: APP_MIN_WIDTH + APP_PADDING, minHeight: APP_MIN_HEIGHT + APP_PADDING
			},

			wrapper: {
				position: 'absolute',
				top: 0, left: 0, right:0, bottom: 0,
				width: '100%', height: '100%',
				display: 'flex',
				flexDirection: 'column',
				minWidth: APP_MIN_WIDTH, minHeight: APP_MIN_HEIGHT
			},

			topSectionWrapper: {
				width: '100%', 
				flex: 10
			},
			bottomSectionWrapper: {
				width: '100%', 
				flex: showControlPanel ? '1 1 100px' : '0 1 50px'
			},
			topSection: {
				width: '100%', height: '100%',
				display: 'flex',
				alignItems: 'stretch'
			},
			bottomSection: {
				width: '100%', height: '100%',
				display: 'flex'
			},
			drumSection: {
				flex: '0 1'
			},
			padSection: {
				flex: 1
			}
		}

		return (
			<div id='page-wrapper' style={styles.pageWrapper}>
				<div id='wrapper' style={styles.wrapper}>
					<div id='top-section-wrapper' style={styles.topSectionWrapper}>
						<div id='top-section' style={styles.topSection}>
							<div style={styles.drumSection}>
								<DrumSection />
							</div>
							<div style={styles.padSection}>
								<PadSection />
							</div>
						</div>
					</div>
					<div id='bottom-section-wrapper' style={styles.bottomSectionWrapper}>
						<div id='bottom-section' style={styles.bottomSection}>
							<ControlSection showControlPanel={showControlPanel}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	showDrumPanel: getDrumPanel(state),
	showControlPanel: getControlPanel(state)
})

export default Radium(connect(mapStateToProps)(AppLayout))