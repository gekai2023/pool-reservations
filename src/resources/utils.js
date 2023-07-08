const pastShifts = ["20230701AM", "20230701PM"];
const lockedShifts = ["20230708AM", "20230708PM"];
const getPastShifts = (includeLocked) => includeLocked?pastShifts.concat(lockedShifts):pastShifts;
const utils = {
    filterPastShifts: (shifts, includeLocked) => shifts.filter(shift => !getPastShifts(includeLocked).includes(shift.shiftId)),
    getLockedShifts: () => lockedShifts
}

export default utils;