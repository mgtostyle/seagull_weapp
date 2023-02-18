import Request from "../network/request"

export const index = new Request<any>('POST', 'api.login/index', 'Object')