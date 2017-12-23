import {
	MATT_MODE,
	TIANA_MODE
} from './constants'

const drumConfig = [
	{
		type: 'CAR',
		label: 'Car',
		color: '#484A47',
		[MATT_MODE]: 'wav/CAR.wav',
		[TIANA_MODE]: 'wav/CAR_T.wav'
	},
	{
		type: 'MY_GIRLFRIEND',
		label: 'My Girlfriend',
		color: '#5C6D70',
		[MATT_MODE]: 'wav/MY_GIRLFRIEND.wav',
		[TIANA_MODE]: 'wav/MY_GIRLFRIEND_T.wav'
	},
	{
		type: 'BONSON',
		label: 'Bonson/Chanson',
		color: '#A37774',
		[MATT_MODE]: 'wav/BONSON.wav',
		[TIANA_MODE]: 'wav/BONSON_T.wav'
	},
	{
		type: 'BUTT',
		label: 'Butt',
		color: '#E88873',
		[MATT_MODE]: 'wav/BUTT.wav',
		[TIANA_MODE]: 'wav/BUTT_T.wav'
	},
	{
		type: 'CHRISTMAS',
		label: 'Christmas',
		color: '#E0AC9D',
		[MATT_MODE]: 'wav/CHRISTMAS.wav',
		[TIANA_MODE]: 'wav/CHRISTMAS_T.wav'
	},
	{
		type: 'MITCH',
		label: 'Mitch',
		color: '#484A47',
		[MATT_MODE]: 'wav/MITCH.wav',
		[TIANA_MODE]: 'wav/MITCH_T.wav'
	},
	{
		type: 'GRANDMA',
		label: 'Grandma Connie',
		color: '#5C6D70',
		[MATT_MODE]: 'wav/GRANDMA.wav',
		[TIANA_MODE]: 'wav/GRANDMA_T.wav'
	}
]

export default drumConfig