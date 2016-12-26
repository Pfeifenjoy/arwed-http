import request from "superagent"
import Request from "./request"

export default class PostRequest extends Request {
    send() {
        return request
            .post(this.destination)
            .send(this.payload)
    }
}
