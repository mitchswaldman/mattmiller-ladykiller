import React from 'react'
import Radium from 'radium'
import drumConfig from '../../drumConfig'
import {
	TOTAL_STEPS
} from '../../constants'

import PadSection from '../PadSection'
import ControlSection from '../ControlSection'
const APP_MIN_WIDTH = 600
const APP_MIN_HEIGHT = 400
const APP_PADDING = 40;


class AppLayout extends React.Component {
	shouldComponentUpdate() {
		return false;
	}
	
	render() {
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
			}
		}

		return (
			<div style={styles.pageWrapper}>
				<div style={styles.wrapper}>
					<PadSection />
					<ControlSection />
				</div>
			</div>
		)
	}
}

export default Radium(AppLayout)