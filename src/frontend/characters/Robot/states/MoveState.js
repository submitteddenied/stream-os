const MAX_X_DELTA = 18
const MAX_SPEED_PER_SECOND = MAX_X_DELTA / 2
const TARGET_THRESHOLD = 0.3

import util from '../../../util'

class MoveState {
  constructor(robot) {
    this.targetLocation = (Math.random() * 2 * MAX_X_DELTA) - MAX_X_DELTA
    if(robot.position().x > this.targetLocation) {
      this.moving = 'left'
    } else {
      this.moving = 'right'
    }
  }

  activate(currT, robot) {
    robot.fadeToAction('Walking', 0.5)
  }

  update(dt, currT, robot) {
    if(this.moving === 'left') {
      if(robot.rotation().y > util.degToRad(-90)) {
        robot.rotation().y -= util.degToRad(10)
      }
      if(robot.position().x > this.targetLocation) {
        robot.position().x -= MAX_SPEED_PER_SECOND * dt
      }
    } else {
      if(robot.rotation().y < util.degToRad(90)) {
        robot.rotation().y += util.degToRad(10)
      }
      if(robot.position().x < this.targetLocation) {
        robot.position().x += MAX_SPEED_PER_SECOND * dt
      }
    }

    if(Math.abs(robot.position().x - this.targetLocation) < TARGET_THRESHOLD) {
      return true
    }
    return false
  }
}

export default MoveState