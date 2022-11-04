import * as compositeVerify from '@/config/apis/composite/verify'
import * as compositeCheck from '@/config/apis/composite/check'
import * as compositeSetting from '@/config/apis/composite/setting'
import * as compositeSelect from '@/config/apis/composite/select'
import * as compositeCommon from '@/config/apis/composite/common'

export default {
  composite: {
    verify: compositeVerify,
    check: compositeCheck,
    setting: compositeSetting,
    select: compositeSelect,
    common: compositeCommon
  }
}
