// this function receive start time and finish time in the same day,
// and calculate the hours between them

// input:
// start - string - time with ':' between the hours and minutes (e.g. 09:30)
// finish - string - time with ':' between the hours and minutes (e.g. 11:00)

// output (Object with 2 keys):
// timeFormat - string - hours between the times for display (e.g 1:30)
// numberFormat - number - hours between the times for calculating (e.g 1.5)

function calculateHours (start, finish) {
    const startHour = start.split(":");
    const finishHour = finish.split(":");
    const startDate = new Date(0, 0, 0, startHour[0], startHour[1], 0);
    const endDate = new Date(0, 0, 0, finishHour[0], finishHour[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    
    const timeFormat = `${hours}:${minutes < 9 ? "0" : ""}${minutes}`;
    const numberFormat = hours + (minutes/60);
    
    return {timeFormat, numberFormat};
}

export default calculateHours;