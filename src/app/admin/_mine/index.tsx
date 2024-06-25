'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Modal, notification, Switch } from 'antd';
import '../style.scss';
import { createMineRequest, listMineRequest, removeMineRequest } from '@/store/user/actions';
import { useDispatch } from 'react-redux';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const Mine = () => {
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<any>();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any) => {
    api[type]({
      message: message.message,
      description: message.description,
      duration: 2,
    });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || ''));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(
        listMineRequest(
          user,
          (res: any) => {
            setData(res.data);
            setIsLoading(false);
          },
          (error: any) => console.log('error', error),
        ),
      );
    }
  }, [isLoading, user]);

  const handleDelete = (values: any) => {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const data = { mineKey: values.mineKey, userName: user.userName, password: user.password };
    dispatch(
      removeMineRequest(
        data,
        (res: any) => {
          openNotificationWithIcon('success', {
            message: 'tạo thành công',
          });
          setIsLoading(true);
        },
        (error: any) => console.log('error', error),
      ),
    );
  };

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (record: any) => <img className="img" src={record} alt="mine-s-12" />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mine Name',
      dataIndex: 'mineName',
      key: 'mineName',
    },
    {
      title: 'Profit Per Hour',
      dataIndex: 'profitPerHour',
      key: 'profitPerHour',
    },
    {
      title: 'Mine Key',
      dataIndex: 'mineKey',
      key: 'mineKey',
    },
    {
      title: 'isVip',
      dataIndex: 'isVip',
      key: 'isVip',
      render: (record: any) => <p>{record.toString()}</p>,
    },

    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <div className="flex">
          {/* <Button className="btn" onClick={() => handleUpdate(record)}>
            Update
          </Button> */}
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleCreate = (values: any) => {
    const data = {
      ...values,
      isVip: values.isVip ? values.isVip : false,
      mineKey: Number(values.mineKey),
      userName: user.userName,
      password: user.password,
    };

    dispatch(
      createMineRequest(
        data,
        (res: any) => {
          setIsLoading(true);
          openNotificationWithIcon('success', {
            message: 'tạo thành công',
          });
        },
        (error: any) => console.log('error', error),
      ),
    );
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Button type="primary" onClick={handleModalOpen}>
          Create New Mine
        </Button>
        <Modal
          title="Create Mine"
          visible={isModalOpen}
          onCancel={handleModalCancel}
          footer={[
            <Button key="back" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Create
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <Form.Item label="Logo" name="logo">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Mine Name" name="mineName">
              <Input />
            </Form.Item>
            <Form.Item label="Profit Per Hour" name="profitPerHour">
              <Input />
            </Form.Item>
            <Form.Item label="Mine Key" name="mineKey">
              <Input />
            </Form.Item>
            <Form.Item label="isVip" name="isVip">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Mine;
