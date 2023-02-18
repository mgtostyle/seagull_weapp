import Request from "../network/request"

export const index = new Request<string>('GET', 'api.product/index', 'Suffix')

export const detail = new Request<string>('GET', 'api.product/detail', 'Suffix')

export const getOrderList = new Request<string>('GET', 'api.product/getOrderList', 'Suffix')

export const save = new Request<string>('GET', 'api.product/save', 'Suffix')

export const getOrderDetail = new Request<string>('GET', 'api.product/getOrderDetail', 'Suffix')