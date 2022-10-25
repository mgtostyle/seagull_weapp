import React, { PropsWithChildren } from 'react'
import type { PageProps } from './interface'

import { UsForm, UsInput, UsTextArea, UsRadio, UsCheckbox, UsUpload, UsContainer } from '../../../components/usComp'

const VerifyLogin: React.FC<PropsWithChildren<PageProps>> = () => {

  return (
    <UsContainer title="头部信息">
      <UsForm
        onSubmit={(values) => console.log(values.detail.value)}
      >
        <UsForm.Item label="输入框" name="input">
          <UsInput placeholder='请输入...' />
        </UsForm.Item>
        <UsForm.Item label="文本域" name="textarea">
          <UsTextArea placeholder='请输入...' />
        </UsForm.Item>
        <UsForm.Item label="单选框" name="radio">
          <UsRadio.Group>
            <UsRadio value={1}>1</UsRadio>
            <UsRadio value={2}>2</UsRadio>
            <UsRadio value={3}>3</UsRadio>
            <UsRadio value={4}>4</UsRadio>
          </UsRadio.Group>
        </UsForm.Item>
        <UsForm.Item label="复选框" name="checkbox">
          <UsCheckbox.Group>
            <UsCheckbox value={1}>1</UsCheckbox>
            <UsCheckbox value={2}>2</UsCheckbox>
            <UsCheckbox value={3}>3</UsCheckbox>
            <UsCheckbox value={4}>4</UsCheckbox>
          </UsCheckbox.Group>
        </UsForm.Item>
        <UsUpload />
      </UsForm>
    </UsContainer>
  )

}

export default VerifyLogin
