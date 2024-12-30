import { Button, Card, FormProps, Typography } from 'antd'
import './Register.scss'
import { DatePicker, Form, Input } from 'antd'
import { toast } from 'react-toastify'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Dayjs } from 'dayjs'
import { Link } from 'react-router-dom'
import { routerLogin } from '@/views/Auth/components/Login/router'

interface IRegisterField {
  email: string
  username: string
  password: string
  confirmPassword: string
  name: string
  phoneNumber: string
  dayOfBirth: Dayjs
}

const CardTiTle = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
    </div>
  )
}

const initialValues: IRegisterField = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  dayOfBirth: null as unknown as Dayjs
}

const Register = () => {
  const [form] = Form.useForm()

  const onFinish: FormProps<IRegisterField>['onFinish'] = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Password and confirmPassword are not the same')
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      const user = auth.currentUser
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: values.name,
          username: values.username,
          phoneNumber: values.phoneNumber,
          dayOfBirth: values.dayOfBirth.format('YYYY-MM-DD')
        })
      }
      console.log('🚀 ~ constonFinish: ', user)
      form.resetFields()
      toast.success('Register successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const onFinishFailed: FormProps<IRegisterField>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={'registerContainer'}>
      <Card title={<CardTiTle />} className={'registerCard'}>
        <Form
          labelCol={{ span: 4 }}
          initialValues={initialValues}
          wrapperCol={{ span: 14 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Form.Item<IRegisterField>
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IRegisterField>
            label="username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IRegisterField>
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<IRegisterField>
            label="confirmPassword"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please input your confirmPassword!' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<IRegisterField> label="name" name="name">
            <Input />
          </Form.Item>
          <Form.Item<IRegisterField> label="phoneNumber" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item<IRegisterField>
            label="dayOfBirth"
            name="dayOfBirth"
            rules={[
              { required: true, message: 'Please input your dayOfBirth!' }
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <Typography.Text>
            You already have an account!.{' '}
            <Link to={routerLogin.path}>Login now!</Link>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  )
}

export default Register
