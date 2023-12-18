const factorial = function (n){
    if(typeof n === 'bigint' && n === 0n){
        return 1n
    } else if(typeof n ==='number' && n === 0){
        return 1
    }
    if(typeof n === 'bigint' && n > 1n){
        return n * factorial(n-1n)
    } else if(typeof n === 'number' && n> 1){
        return n * factorial(n-1)
    } else {
        return n
    }
}

module.exports = { factorial }