import { Card, Typography } from 'antd'
import './Login.scss'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import authenticationPresenter from '@/modules/authentication/presenter'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { resetToken } from '@/modules/authentication/profileStore'
import { Link, useNavigate } from 'react-router-dom'
import { routerRegister } from '@/views/Auth/components/Register/router'
import { toast } from 'react-toastify'
import { routerHome } from '@/views/home/router'

type FieldType = {
  username: string
  password: string
  remember?: string
}

const CardTiTle = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
    </div>
  )
}

const Login = () => {
  const dispath = useAppDispatch()
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await authenticationPresenter.login(
        values.username,
        values.password
      )

      dispath(
        resetToken({
          accessToken: await response.user.getIdToken(),
          refreshToken: response.user.refreshToken
        })
      )

      navigate(routerHome.path)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      toast.error('Email or password is incorrect!')
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={'loginContainer'}>
      <Card title={<CardTiTle />} className={'loginCard'}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item<FieldType> name="remember" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <div className="register__link__container">
            <Typography.Text className="register__link">
              You don't have account.{' '}
              <Link to={routerRegister.path}>Register account!</Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login
