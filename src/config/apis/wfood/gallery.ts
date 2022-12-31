import Request from "@/config/network/request"

export const navigateTools = new Request<any>('POST', '/wfood/platform/gallery/navigateTools', 'Object')

export const navigateMenu = new Request<string>('GET', '/wfood/platform/gallery/navigateMenu', 'Suffix')