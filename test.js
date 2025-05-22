const varifid = false ;

// console.log(( varifid == true ? 'ok' : 'No') )



function getTimeString(time) {
    // Calculate months
    const month = Math.floor(time / (30 * 24 * 3600));
    let remainingSeconds = time % (30 * 24 * 3600);

    // Calculate days
    const day = Math.floor(remainingSeconds / (24 * 3600));
    remainingSeconds = remainingSeconds % (24 * 3600);

    // Calculate hours
    const hour = Math.floor(remainingSeconds / 3600);
    remainingSeconds = remainingSeconds % 3600;

    // Calculate minutes and seconds
    const minute = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return `${month} month ${day} days ${hour} hour ${minute} minute ${seconds} seconds ago`;
}

// Example usage:
console.log(getTimeString(1000000));