'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Modal, notification } from 'antd';
import '../style.scss';
import { useDispatch } from 'react-redux';
import { createTaskRequest, listTaskRequest, updateTaskRequest } from '@/store/user/actions';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const Task = React.memo(() => {
  const [data, setData] = useState<any>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>();
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
        listTaskRequest(
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

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Task Point',
      dataIndex: 'taskPoint',
      key: 'taskPoint',
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      key: 'taskDescription',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text: any, record: any) => (
    //     <div className="flex">
    //       <Button className="btn" onClick={() => handleUpdate(record)}>
    //         Update
    //       </Button>
    //       <Button onClick={() => handleDelete(record)}>Delete</Button>
    //     </div>
    //   ),
    // },
  ];

  const handleCreate = (values: any) => {
    const data = {
      ...values,
      userName: user.userName,
      password: user.password,
    };
    dispatch(
      createTaskRequest(
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

  const handleUpdate = (record: any) => {
    const data = {
      taskKey: record.key,
      taskDescription: record.taskDescription,
      taskName: record.taskName,
      taskPoint: record.taskPoint,
      userName: user.userName,
      password: user.password,
    };
    dispatch(
      updateTaskRequest(
        data,
        (res: any) => {
          setIsLoading(true);
          openNotificationWithIcon('success', {
            message: 'update thành công',
          });
        },
        (error: any) => console.log('error', error),
      ),
    );
    setIsModalOpenUpdate(true);
    form.setFieldsValue(record);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpenUpdate(false);
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Button type="primary" onClick={handleModalOpen}>
          Create New Task
        </Button>
        {isModalOpen && (
          <Modal
            title="Create New Item"
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
              <Form.Item label="Task Name" name="taskName">
                <Input />
              </Form.Item>
              <Form.Item label="Task Point" name="taskPoint">
                <Input />
              </Form.Item>
              <Form.Item label="Task Description" name="taskDescription">
                <Input />
              </Form.Item>
              <Form.Item label="Key" name="key">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        )}
        {isModalOpenUpdate && (
          <Modal
            title="Update Item"
            visible={isModalOpenUpdate}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Update
              </Button>,
            ]}
          >
            <Form form={form} layout="vertical" onFinish={(values) => handleUpdate(values)}>
              <Form.Item label="Task Name" name="taskName">
                <Input />
              </Form.Item>
              <Form.Item label="Task Point" name="taskPoint">
                <Input />
              </Form.Item>
              <Form.Item label="Task Description" name="taskDescription">
                <Input />
              </Form.Item>
              <Form.Item label="Key" name="key">
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
});

export default Task;
