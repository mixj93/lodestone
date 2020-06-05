import React, { useRef } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, message } from 'antd'

import { leaveMessgae } from '../apis/home'

const MessageForm = () => {
  const formName = 'message'
  const formRef = useRef()
  const onFinish = async (values) => {
    try {
      await leaveMessgae(formName, values)
      message.success('留言成功')
      formRef.current.resetFields()
    } catch (error) {
      message.error('留言失败，请重试')
    }
  }

  return (
    <Form layout="vertical" name={formName} ref={formRef} onFinish={onFinish}>
      <Form.Item
        label="称呼"
        name="name"
        rules={[{ required: true, message: '称呼必填' }]}
      >
        <Input placeholder="请输入你的称呼" />
      </Form.Item>

      <Form.Item
        label="联系方式"
        name="email"
        rules={[{ required: true, message: '联系方式必填' }]}
      >
        <Input placeholder="请输入你的联系方式，如邮箱、QQ、WX、微博等" />
      </Form.Item>

      <Form.Item
        label="留言"
        name="message"
        rules={[{ required: true, message: '留言必填' }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 3 }}
          placeholder="请输入你的留言"
        />
      </Form.Item>

      <CenterStyledItem>
        <Button size="large" type="primary" htmlType="submit">
          确认提交
        </Button>
      </CenterStyledItem>
    </Form>
  )
}

const CenterStyledItem = styled(Form.Item)`
  text-align: center;
`

export default MessageForm
