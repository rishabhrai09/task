var array = [50, 40, 50, 50, 80, 80, 80, 40, 20, 20, 20, 30, 30, 30, 10, 10, 10, 20]
// no is number of Integers in array
const sockFunction = (no, arr) => {
    let socks = {}; // bag to holding pairs of Socks
    let pairs = 0; // initial value is zero
    for (let element of arr) { //lopping through error
        socks[element] = socks[element] + 1 || 1; // it will store pair of socks if it is found or (||) if single sock is found 
        if (socks[element] % 2 === 0) { // if same pair number of is divisible by 2 i want to add into pair of socks

            pairs += 1;
        }
    }
    return pairs;
}

console.log(sockFunction(18, array)) 