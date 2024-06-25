'use client';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AntdRegistry>{children}</AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}
