import React from 'react'
import Radium from 'radium'
import drumConfig from '../../drumConfig'
import {
	TOTAL_STEPS
} from '../../constants'

import PadSection from '../PadSection'

const APP_WIDTH = 1200
const APP_HEIGHT = 800
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
				minWidth: APP_WIDTH + APP_PADDING, minHeight: APP_HEIGHT + APP_PADDING
			},

			wrapper: {
				position: 'absolute',
				top: 0, left: 0, right:0, bottom: 0,
				width: APP_WIDTH, height: APP_HEIGHT
			}
		}

		return (
			<div styles={styles.pageWrapper}>
				<div styles={styles.wrapper}>
					<PadSection width={APP_WIDTH} height={APP_HEIGHT}/>
				</div>
			</div>
		)
	}
}

export default Radium(AppLayout)