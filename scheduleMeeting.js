const dayStart = "07:30";
const dayEnd = "17:45";

function getDate(text) {
    let date = new Date(Date.now())
    let parts = text.match(/(\d+)\:(\d+)/)
    date.setHours(parts[1])
    date.setMinutes(parts[2])
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date;
}
let dayStartDate = getDate(dayStart)
let dayEndDate = getDate(dayEnd)
console.log(`dayStartDate: ${dayStartDate}, dayEndDate: ${dayEndDate}, ${dayEndDate <= dayEndDate}`)

function scheduleMeeting(startTime, durationMinutes) {
    let startTimeDate = getDate(startTime)
    let endTimeDate = getDate(startTime)
    endTimeDate.setMinutes(startTimeDate.getMinutes() + durationMinutes)

    console.log(`startTime: ${startTimeDate}, endTime: ${endTimeDate}`)
    return startTimeDate >= dayStartDate && endTimeDate <= dayEndDate
}

console.log(scheduleMeeting("7:00", 15));     // false
console.log(scheduleMeeting("07:15", 30));    // false
console.log(scheduleMeeting("7:30", 30));     // true
console.log(scheduleMeeting("11:30", 60));    // true
console.log(scheduleMeeting("17:00", 45));    // true
console.log(scheduleMeeting("17:30", 30));    // false
console.log(scheduleMeeting("18:00", 15));    // false