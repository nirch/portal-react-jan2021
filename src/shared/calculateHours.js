
function calculateHours (start, finish) {
    const startHour = start.split(":");
    const finishHour = finish.split(":");
    const startDate = new Date(0, 0, 0, startHour[0], startHour[1], 0);
    const endDate = new Date(0, 0, 0, finishHour[0], finishHour[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    
    const timeFormat = `${hours}:${minutes < 9 ? "0" : ""}${minutes}`;          // for display
    const numberFormat = hours + (minutes/60);                                  // for calculating
    
    return {timeFormat, numberFormat};
}

export default calculateHours;