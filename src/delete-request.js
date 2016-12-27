import request from "superagent"
import Request from "./request"

export default class DeleteRequest extends Request {
    send() {
        return request
            .delete(this.destination)
            .send(this.payload)
    }
}
