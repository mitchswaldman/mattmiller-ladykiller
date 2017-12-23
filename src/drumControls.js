/*
Configuration for what types of controls the samples will have.
These controls will need to be interpreted by the sequencer to have audible meaning.
*/
const drumControls = {
	level: {
		max: 1,
		min: 0,
		value: .5,
		step: 0.01
	},
	pan: {
		max: 1,
		min: -1,
		value: 0,
		step: 0.01
	},
	speed: {
		max: 3,
		min: 0,
		value: 1.0,
		step: 0.1
	}
}

export default drumControls