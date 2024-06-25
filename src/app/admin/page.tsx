'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';
import './style.scss';
import Task from './_task';
import Mine from './_mine';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    let isActiveUser = localStorage.getItem('user');
    if (!isActiveUser) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Task />
      <Mine />
    </>
  );
}
