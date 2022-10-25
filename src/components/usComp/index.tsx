import UsContainer from '../usContainer'
import UsTabbar from '../usTabbar'
import * as UsFormComponent from '../usForm'
import * as UsFormItemComponent from '../usForm/Item'
import UsFormItemGroup from '../usForm/ItemGroup'
import UsInput from '../usInput'
import * as UsButtonComponent from '../usButton'
import UsButtonGroup from '../usButton/group'

const UsForm = (UsFormComponent as any).default
const UsFormItem = (UsFormItemComponent as any).default
UsFormItem.Group = UsFormItemGroup
UsForm.Item = UsFormItem

const UsButton = (UsButtonComponent as any).default
UsButton.Group = UsButtonGroup

export {
  UsContainer,
  UsTabbar,
  UsForm,
  UsInput,
  UsButton,
}
