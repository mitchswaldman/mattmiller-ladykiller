import React from 'react'
import Radium from 'radium'
import {
	ConnectedPatternControl 
} from './connectedComponents'
import {
	TOTAL_PATTERNS
} from '../../constants'

class PatternControlSection extends React.Component {
	shouldComponentUpdate() {
		return false
	}

	render() {
		const style = {
			display: 'flex'
		}
		return (
			<div>
				<div>
					Pattern
				</div>
				<div style={style}>
					{[...Array(TOTAL_PATTERNS).keys()].map((patternIdx) => {
						return (
							<ConnectedPatternControl key={patternIdx} pattern={patternIdx}/>
						)
					})}
				</div>
			</div>
		)
	}
}

export default Radium(PatternControlSection)