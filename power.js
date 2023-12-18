const power = function (base, exponent){
    assert(Number.isInteger(exponent) & exponent >= 0 & typeof base == 'number', "Number is not even!");
    if(exponent > 0) {
        if (exponent % 2 === 0) {
            return power(base, exponent/2) ** 2;
            //return base ** ((2 * exponent) / 2)
        } else {
            return base * power(base, exponent - 1);
        }
    } else {
        return 1;
    }
}

 function assert(condition, message){
     if(!condition) throw new Error(message || "Assertion failed!");
 }

module.exports = { power }


function fibonacci(exponent){
    if(exponent > 0) {
        return fibonacci((1+Math.sqrt(5))/2);
    } else {
        return (1+Math.sqrt(5))/2
    }
}



