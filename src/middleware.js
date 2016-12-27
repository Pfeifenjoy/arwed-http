import Request from "./request"

function sterilizeRoot(root="") {
    if(root[root.length] === "/") {
        return root.slice(0, root.length - 1)
    }
    return root
}

export default (path, name, options) => store => {
    //check types of parameters
    if(typeof path !== "string") {
        throw new TypeError("Path must be a string.")
    }
    if(typeof name !== "undefined" && typeof name !== "string") {
        throw new TypeError("Name must be a string.")
    }

    //get value out of the store.
    path = path.split(".")
    let value = store.getState()

    path.forEach(p => {
        value = value[p]
    })

    //determine key
    let key
    if(typeof name === "string") {
        key = name
    } else {
        key = path[ path.length - 1 ]
    }

    return next => action => {
        if(action.payload instanceof Request) {

            //get url root / prefix
            let { rootUrl } = options
            if(rootUrl && action.payload.destination[0] === "/") {
                rootUrl = sterilizeRoot(rootUrl)
            } else if (rootUrl && typeof document === "object") {
                rootUrl = sterilizeRoot(document.pathname)
            } else {
                rootUrl = ""
            }
            action.payload.destination = rootUrl + action.payload.destination

            //construct payload
            const payload = {}
            payload[key] = value

            //fire request
            action.payload = action.payload.addPayload(payload).send()
        }

        return next(action)
    }
}
