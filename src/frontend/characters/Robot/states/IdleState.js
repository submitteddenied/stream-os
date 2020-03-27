import MoveState from './MoveState'

import util from '../../../util'

class IdleState {
  constructor(robot) {
    this.idleStart = 0
    this.idleDurationSec = 5
  }

  activate(currT, robot) {
    this.idleStart = currT
    this.idleDurationSec = util.jitter(5, 0.25)
    robot.fadeToAction('Idle', 1)
  }

  update(dt, currT, robot) {
    //returns false if this state is not finished and should stay on the stack
    if(Math.abs(robot.rotation().y) > util.degToRad(1)) {
      robot.rotation().y -= Math.sign(robot.rotation().y) * Math.min(Math.abs(robot.rotation().y), util.degToRad(10))
    }

    if(this.idleStart + this.idleDurationSec < currT) {
      //become not idle
      //ie, do a movestate
      //    do an emote

      robot.pushState(new MoveState(robot))
    }
  }
}

export default IdleState