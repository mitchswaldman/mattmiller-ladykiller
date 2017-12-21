import {
	MATT_MODE,
	TIANA_MODE
} from './constants'

const drumConfig = [
	{
		type: 'CAR',
		label: 'Car',
		color: '#4286f4',
		[MATT_MODE]: 'wav/CAR.wav',
		[TIANA_MODE]: 'wav/CAR.wav'
	},
	{
		type: 'MY_GIRLFRIEND',
		label: 'My Girlfriend',
		color: '#5341f4',
		[MATT_MODE]: 'wav/MY_GIRLFRIEND.wav',
		[TIANA_MODE]: 'wav/MY_GIRLFRIEND.wav'
	}
]

export default drumConfig