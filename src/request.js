import { fluent } from "./decorators"

export default class Request {
    constructor(destination="", payload={}) {
        this.destination = destination
        this.payload = payload

        if(typeof this.send !== "function") {
            throw new TypeError("This is an abstract class. Child class must override send method.")
        }
    }

    @fluent
    addPayload(key, value) {
        this.payload[key] = value
    }
}
