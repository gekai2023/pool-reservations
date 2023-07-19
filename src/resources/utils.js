const pastShifts = ["20230701AM", "20230701PM", "20230708AM", "20230708PM", "20230715AM", "20230715PM"];
const lockedShifts = [];
const getPastShifts = (includeLocked) => includeLocked?pastShifts.concat(lockedShifts):pastShifts;
const utils = {
    filterPastShifts: (shifts, includeLocked) => shifts.filter(shift => !getPastShifts(includeLocked).includes(shift.shiftId)),
    getLockedShifts: () => lockedShifts
}

export default utils;