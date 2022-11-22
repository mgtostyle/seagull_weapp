import Request from "@/config/network/request"
import type { CompositeAdministratorAccountList, CompositeAdministratorApplyList } from '@/config/apis/index/interface'

export const accountList = new Request<CompositeAdministratorAccountList>('POST', '/composite/terminal/administrator/accountList', 'Object')

export const applyList = new Request<CompositeAdministratorApplyList>('POST', '/composite/terminal/administrator/applyList', 'Object')

export const accountDetail = new Request<string>('GET', '/composite/terminal/administrator/accountDetail', 'Suffix')

export const accountPublish = new Request<string>('GET', '/composite/terminal/administrator/accountPublish', 'Suffix')