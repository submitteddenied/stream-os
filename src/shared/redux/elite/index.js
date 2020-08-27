const ACTIONS = {
    FSD_JUMP: 'FSDJump',
    SCAN: 'Scan',
    FSS_ALL_BODIES_FOUND: 'FSSAllBodiesFound',
    SURFACE_SCANNED: 'SAAScanComplete'
}

const DEFAULT_STATE = {
    loadedState: false,
    systemScanned: false,
    currentSystem: {},
    bodiesToMap: [],
    mappedBodies: []
}

// TODO: put all the body types and their values in here, allow a config for "minimum map value"
// data.WasDiscovered indicates that the planet has been previously discovered
// data.WasMapped indicates that the planet has been previously mapped

function isTarget(state, data) {
    //skip stuff that's already mapped
    if(state.mappedBodies.indexOf(data.BodyName) >= 0) {
        return false
    }

    // If terraformable, we want to map:
    if(data.TerraformState === 'Terraformable') {
        return true
    }

    //Otherwise, we always want to map:
    const alwaysMap = ['Earthlike body', 'Water world', 'Ammonia world']
    if(alwaysMap.indexOf(data.PlanetClass) >= 0) {
        return true
    }

    return false
}

const eliteReducer = (state=DEFAULT_STATE, action) => {
    //TODO STATUS action gives a bunch of info
    switch(action.type) {
        case ACTIONS.FSD_JUMP:
            return Object.assign({}, state, { loadedState: true, systemScanned: false, currentSystem: action.event, bodiesToMap: [], mappedBodies: [] })
        case ACTIONS.SCAN:
            if(action.event.ScanType === 'Detailed' && isTarget(state, action.event)) {
                return Object.assign({}, state, { loadedState: true, bodiesToMap: [...state.bodiesToMap, action.event.BodyName]})
            } else {
                return state
            }
        case ACTIONS.FSS_ALL_BODIES_FOUND:
            return Object.assign({}, state, { loadedState: true, systemScanned: true })
        case ACTIONS.SURFACE_SCANNED:
            return Object.assign({}, state, { loadedState: true }, {
                bodiesToMap: state.bodiesToMap.filter((x) => x !== action.event.BodyName),
                mappedBodies: [...state.mappedBodies, action.event.BodyName]
            })
        default:
            return state
    }
}

module.exports = {
    elite: eliteReducer,
    ACTIONS
}