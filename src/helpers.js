export const stepKey = (drumType, step, pattern) => {
	return `${drumType}_${step}_${pattern}`
}

export const bufferKey = (drumType, mode) => {
	return `${drumType}_${mode}`
}