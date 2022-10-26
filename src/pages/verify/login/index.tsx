import React, { PropsWithChildren } from 'react'
import type { PageProps } from './interface'

import { UsForm, UsInput, UsTextArea, UsRadio, UsCheckbox, UsUpload, UsContainer, UsPicker } from '../../../components/usIndex'

const VerifyLogin: React.FC<PropsWithChildren<PageProps>> = () => {

  return (
    <UsContainer title="头部信息">
      <UsForm
        initialValues={{
          input: 'dasdadasd',
          picker: [1, 2, 3, 4]
        }}
        onSubmit={(values) => console.log(values)}
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
        <UsForm.Item label="上传图片" name="upload">
          <UsUpload />
        </UsForm.Item>
        <UsForm.Item label="选择器" name="picker">
          <UsPicker
            placeholder="请选择..."
            modal={{
              title: '选择XXXX',
              range: [
                {
                  value: 1,
                  label: '广东省',
                  children: [
                    {
                      value: 2,
                      label: '深圳市',
                      children: [
                        {
                          value: 3,
                          label: '龙华区',
                          children: [
                            {
                              value: 4,
                              label: '龙华街道'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }}
          />
        </UsForm.Item>
      </UsForm>
    </UsContainer>
  )

}

export default VerifyLogin
