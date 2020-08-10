const EdLog = require('ed-log')

class EliteDangerous {
    constructor(store) {
        this.store = store

        this.logger = new EdLog()
        this.logger.on('*', (event) => this.handleEvent(event))
    }

    handleEvent(data) {
        this.store.dispatch({type: data.event, event: data})
    }
}

module.exports = EliteDangerous