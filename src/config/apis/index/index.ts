import * as compositeVerify from '@/config/apis/composite/verify'
import * as compositeCheck from '@/config/apis/composite/check'
import * as compositeSetting from '@/config/apis/composite/setting'
import * as compositeSelect from '@/config/apis/composite/select'
import * as compositeCommon from '@/config/apis/composite/common'
import * as compositeAdministrator from '@/config/apis/composite/administrator'

import * as wfoodCommon from '@/config/apis/wfood/common'
import * as wfoodSetting from '@/config/apis/wfood/setting'
import * as wfoodGallery from '@/config/apis/wfood/gallery'
import * as wfoodCategory from '@/config/apis/wfood/category'
import * as wfoodGoods from '@/config/apis/wfood/goods'
import * as wfoodSelect from '@/config/apis/wfood/select'

export default {
  composite: {
    verify: compositeVerify,
    check: compositeCheck,
    setting: compositeSetting,
    select: compositeSelect,
    common: compositeCommon,
    administrator: compositeAdministrator
  },
  wfood: {
    common: wfoodCommon,
    setting: wfoodSetting,
    gallery: wfoodGallery,
    category: wfoodCategory,
    goods: wfoodGoods,
    select: wfoodSelect
  }
}
