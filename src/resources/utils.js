const pastShifts = ["20230701AM", "20230701PM", "20230708AM", "20230708PM", "20230715AM", "20230715PM", "20230722AM", "20230722PM",];
const lockedShifts = ["20230729AM", "20230729PM"];
const getPastShifts = (includeLocked) => includeLocked?pastShifts.concat(lockedShifts):pastShifts;
const utils = {
    filterPastShifts: (shifts, includeLocked) => shifts.filter(shift => !getPastShifts(includeLocked).includes(shift.shiftId)),
    getLockedShifts: () => lockedShifts
}

export default utils;