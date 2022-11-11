import QuerySelect from "../querySelect"
import type * as QuerySelectInterface from '../querySelect/interface'
import * as TreeTableComponent from "../treeTable"

const TreeTable = (TreeTableComponent as any).default
TreeTable.Consumer = TreeTableComponent.Consumer

export {
  QuerySelect,
  TreeTable
}

export type QuerySelectColumns = QuerySelectInterface.QuerySelectColumns