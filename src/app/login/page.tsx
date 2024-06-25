'use client';
import { Form, notification, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchUserRequest } from '@/store/user/actions';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export default function LoginPage() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type: NotificationType, message: any) => {
    api[type]({
      message: message.message,
      description: message.description,
      duration: 2,
    });
  };

  const onFinish = (values: any) => {
    dispatch(
      fetchUserRequest(
        values,
        (res: any) => {
          router.push('/admin');
          localStorage.setItem('user', JSON.stringify(values));
        },
        (error: any) => {
          openNotificationWithIcon('error', {
            message: 'Vui lòng nhập lại userName, password',
          });
        },
      ),
    );
  };

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
