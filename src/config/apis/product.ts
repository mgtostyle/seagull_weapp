import Request from "../network/request"

export const index = new Request<string>('POST', '/api.product/index', 'Suffix')

export const detail = new Request<string>('GET', '/api.product/detail', 'Suffix')

export const getOrderList = new Request<any>('POST', '/api.product/getOrderList', 'Object')

export const save = new Request<string>('GET', '/api.product/save', 'Suffix')

export const getOrderDetail = new Request<string>('GET', '/api.product/getOrderDetail', 'Suffix')