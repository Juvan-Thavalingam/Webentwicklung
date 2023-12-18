
let emptyObj = {}
const equal = function (a, b) {

    if(a===b){
        return true;
    } else if (typeof a === typeof b && typeof a === "number"){
        return false
    }

    if(Object.keys(a).length !== Object.values(b).length){
        return false;
    }

    if(Object.values(a).length !== Object.values(b).length){
        return Object.keys(a) === Object.keys(b)
    } else if(typeof a === typeof b && typeof a !== "number"){
        for (let i = 0; i < Object.keys(a).length; i++){
            if(a[Object.keys(a)[i]] !== b[Object.keys(a)[i]]){
                return false
            }
        }
        return true
    }
    return false

}

console.log(equal(16,17))

module.exports = { equal }
