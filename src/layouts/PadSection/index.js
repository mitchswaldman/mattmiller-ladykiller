import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import {
	TOTAL_STEPS
} from '../../constants'
import drumConfig from '../../drumConfig'
import PadRow from './PadRow'


class PadSection extends React.Component {
	
	shouldComponentUpdate() {
		return false
	}
	
	render() {
		const {width, height} = this.props
		const style = {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}


		const PAD_ROW_HEIGHT = height/drumConfig.length;
		return (
			<div style={style}>
				{drumConfig.map(({type, color}, idx) => (
					<PadRow key={idx} 
						type={type} 
						color={color} 
						height={PAD_ROW_HEIGHT} 
						width={width}/>
					))}
			</div>
		)
	}	
}

export default Radium(PadSection)