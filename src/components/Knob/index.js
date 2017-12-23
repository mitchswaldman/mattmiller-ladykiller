import React from 'react'
import Radium from 'radium'
import $ from 'jquery'
import * as jqeryKnob from 'jquery-knob'

class Knob extends React.Component {
	componentDidMount() {
		const {min, max, step, value, onChange} = this.props
		this.$el = $(this.el);
		this.$el.knob({
			'min': min,
			'max': max,
			'step': step,
			'value': value,
			'width': this.props.width || '80%', 
			release: function(v) {
				onChange(v)
			}
		})
	}

	render() {
		return <input ref={el => this.el = el} value={this.props.value}/>;
	}
}

export default Knob