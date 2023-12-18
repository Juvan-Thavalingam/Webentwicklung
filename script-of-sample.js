const scriptOfSample = function (n, script){
    let num = n.charCodeAt(0)

    var arr = script
    for (let x = 0; x < arr.length; x++){
        for(let y = 0; y < arr[x].ranges.length; y++){
            if (num > arr[x].ranges[y][0] && num < arr[x].ranges[y][1] || arr[x].ranges[y][0] === num || arr[x].ranges[y][1] === num){
                return arr[x].name
            }
        }
    }
    return "unknown"
}

module.exports = { scriptOfSample }