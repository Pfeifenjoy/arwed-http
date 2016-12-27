import request from "superagent"
import Request from "./request"

export default class PutRequest extends Request {
    send() {
        return request
            .put(this.destination)
            .send(this.payload)
    }
}
