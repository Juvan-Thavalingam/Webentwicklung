
module.exports = { parseToProto}

let proto = { category: "animal" }

const parseToProto = function (data, proto) {
    return Object.assign(Object.create(proto), JSON.parse(data));
}

//let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)