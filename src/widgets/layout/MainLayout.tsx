import { ImFilesEmpty } from "react-icons/im";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
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
      <div>
         <Header
            style={{
               display:"flex",
               padding: "10px",
               background: colorBgContainer,
               position: "sticky",
               top: 0,
               zIndex: 99,
            }}
         >
            <Button
               type="primary"
               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
               onClick={() => setCollapsed(!collapsed)}
               style={{
                  fontSize: "16px",
                  width: 50,
                  height: 50,
               }}
            />
         </Header>
         <Layout>
            <Sider
               trigger={null}
               collapsible
               collapsed={collapsed}
               width={250}
               style={{
                  position: "sticky",
                  top: 64, // высота Header'а
                  left: 0,
                  height: "calc(100vh - 64px)",
                  background: colorBgContainer,
               }}
            >
               <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     height: "100%",
                     gap: "10px",
                     fontSize: "16px",
                  }}
                  items={[
                     {
                        key: "1",
                        icon: <AiOutlineBarChart />,
                        label: "Statistics",
                        onClick: () =>
                           navigate({ to: RouteNames.Statistics as string }),
                     },
                     {
                        key: "2",
                        icon: <FaUsersCog />,
                        label: "User Control",
                        onClick: () =>
                           navigate({ to: RouteNames.UserControl as string }),
                     },
                     {
                        key: "3",
                        icon: <ImFilesEmpty />,
                        label: "File Management",
                        onClick: () =>
                           navigate({
                              to: RouteNames.FileManagement as string,
                           }),
                     },
                  ]}
               />
            </Sider>
            <Layout>
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
      </div>
   );
};
