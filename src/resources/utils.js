const pastShifts = ["20230701AM", "20230701PM"];
const utils = {
    filterPastShifts: (shifts) => shifts.filter(shift => !pastShifts.includes(shift.shiftId))
}

export default utils;