import React, { useState } from "react";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   UploadOutlined,
   UserAddOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useRouter } from "@tanstack/react-router";
import { RouteNames } from "@/shared";

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);
   const { navigate } = useRouter();
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
      <Layout>
         <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={250}
            style={{
               background: colorBgContainer,
               height: "100vh",
            }}
         >
            <div className="demo-logo-vertical" />
            <Menu
               theme="light"
               mode="inline"
               defaultSelectedKeys={["1"]}
               items={[
                  {
                     key: "1",
                     icon: <UserOutlined />,
                     label: "Statistics",
                     onClick: () =>
                        navigate({ to: RouteNames.Statistics as string }),
                  },
                  {
                     key: "2",
                     icon: <UserAddOutlined />,
                     label: "User Control",
                     onClick: () =>
                        navigate({ to: RouteNames.UserControl as string }),
                  },
                  {
                     key: "3",
                     icon: <UploadOutlined />,
                     label: "File Management",
                     onClick: () =>
                        navigate({ to: RouteNames.FileManagement as string }),
                  },
               ]}
            />
         </Sider>
         <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
               <Button
                  type="text"
                  icon={
                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: "16px",
                     width: 64,
                     height: 64,
                  }}
               />
            </Header>
            <Content
               style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
