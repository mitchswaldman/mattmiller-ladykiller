import {STEP_CLICK} from '../actionTypes'
import {playDrumSound} from '../Sequencer'
import drumBuffer from '../drumBuffer'
import {bufferKey} from '../helpers'
import {audioCtx} from '../audioCtx'
import {getDrumControls, getStepButton} from '../selectors'

export default store => next => action => {
  if (action.type !== STEP_CLICK) {
    return next(action)
  }

  const {payload: {type, step}} = action
  const stepState = getStepButton(store.getState(), type, step)
  // only play the sound when it's being turned on.
  if(!stepState){ 
    const mode = store.getState().mode 
    const buffKey = bufferKey(type, mode)
    const controls = getDrumControls(store.getState(), type)

    playDrumSound(drumBuffer[buffKey], controls, audioCtx.currentTime + .01, audioCtx)
  }

  next(action)
}
