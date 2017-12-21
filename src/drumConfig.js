import {
	MATT_MODE,
	TIANA_MODE
} from './constants'

const drumConfig = [
	{
		type: 'CAR',
		label: 'Car',
		[MATT_MODE]: 'wav/CAR.wav',
		[TIANA_MODE]: 'wav/CAR.wav'
	},
	{
		type: 'MY_GIRLFRIEND',
		label: 'My Girlfriend',
		[MATT_MODE]: 'wav/MY_GIRLFRIEND.wav',
		[TIANA_MODE]: 'wav/MY_GIRLFRIEND.wav'
	}
]

export default drumConfig