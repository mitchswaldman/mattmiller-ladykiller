import React from 'react'
import Radium from 'radium'
import drumConfig from '../../drumConfig'
import {
	ConnectedDrumControlPanel
} from './connectedComponents'

class DrumSection extends React.Component {
	render() {
		const styles = {
			drumSectionWrapper: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			},
			drumControlWrapper: {
				flex: 1
			}
		}
		return (
			<div style={styles.drumSectionWrapper}>
				{drumConfig.map(({type, label}) => {
					return (
						<div style={styles.drumControlWrapper} key={type}>
							<ConnectedDrumControlPanel 
								type={type}
								label={label}
								/>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Radium(DrumSection)