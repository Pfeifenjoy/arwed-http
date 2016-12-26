import Request from "./request"

export default (path, name) => store => next => action => {
    if(action.payload instanceof Request) {

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

        //construct payload
        const payload = {}
        payload[key] = value

        //fire request
        action.payload = action.payload.addPayload(payload).send()

    }

    return next(action)
}
