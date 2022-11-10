import UsContainer from '../usContainer'
import UsTabbar from '../usTabbar'
import * as UsFormComponent from '../usForm'
import * as UsFormItemComponent from '../usForm/item'
import UsFormItemGroup from '../usForm/itemGroup'
import UsInput from '../usInput'
import UsTextArea from '../usTextArea'
import * as UsRadioComponent from '../usRadio'
import UsRadioGroup from '../usRadio/group'
import * as UsCheckboxComponent from '../usCheckbox'
import UsCheckboxGroup from '../usCheckbox/group'
import UsUpload from '../usUpload'
import * as UsPickerComponent from '../usPicker'
import * as UsButtonComponent from '../usButton'
import UsButtonGroup from '../usButton/group'
import UsImage from '../usImage'
import UsArcProgressBar from '../UsArcProgressBar'
import UsDataNone from '../usDataNone'

const UsForm = (UsFormComponent as any).default
const UsFormItem = (UsFormItemComponent as any).default
UsFormItem.Group = UsFormItemGroup
UsForm.Item = UsFormItem

const UsRadio = (UsRadioComponent as any).default
UsRadio.Group = UsRadioGroup

const UsCheckbox = (UsCheckboxComponent as any).default
UsCheckbox.Group = UsCheckboxGroup

const UsPicker = (UsPickerComponent as any).default

const UsButton = (UsButtonComponent as any).default
UsButton.Group = UsButtonGroup

export {
  UsContainer,
  UsTabbar,
  UsForm,
  UsInput,
  UsTextArea,
  UsRadio,
  UsCheckbox,
  UsUpload,
  UsPicker,
  UsButton,
  UsImage,
  UsArcProgressBar,
  UsDataNone
}
