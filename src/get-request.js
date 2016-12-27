import request from "superagent"
import Request from "./request"

export default class GetRequest extends Request {
    send() {
        return request
            .get(this.destination)
            .query(this.payload)
            .send()
    }
}
