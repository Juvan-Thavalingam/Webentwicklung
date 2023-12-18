//Praktikum_3
const findTag = function (a){
    let result
    let check = false
    for (let i = 0; i < a.length; i++){
        if(a[i] === "<"){
            result = ""
            check = true
        } else if(a[i] === ">"){
            console.log(result)
            return result
        } else if(check){
            if(a[i] === " "){
                return undefined
            }
                result += a[i]
        }
    }
    return result
}
module.exports = {findTag}