const element =
    ["div", {style: "background: salmon"},
        ["h1", "Hello World"],
        ["h2", {style: "text-align:right"}, "from our library"] ]
let appRoot = document.getElementById("app")
renderSJDON(element, appRoot)

function renderSJDON(){
    if (Array.isArray(element)) {
        let [type, ...args] = element
        let node = document.createElement(type)

        for (let arg of args) {
            renderSJDON(arg, node)
            parent.appendChild(node)
        }
        parent.appendChild(node)

    } else if (typeof element === 'object') {
        for (let arg in element) {
            parent.setAttribute(arg, element[arg])
        }

    } else {
        let newNode = document.createTextNode(element)
        parent.appendChild(newNode)
    }
}