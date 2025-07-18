import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { ImFilesEmpty } from "react-icons/im";
import { FaUsersCog } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { RouteNames } from "@/shared";
import { authApi } from "@/entities";

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);
   const { navigate } = useRouter();
   const { pathname } = useLocation();
   const { mutate: logout } = authApi.useLogout();

   const logoutFn = () => {
      localStorage.removeItem("auth");
      logout();
      navigate({ to: RouteNames.Login as string });
   };

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const items = [
      {
         key: RouteNames.Home,
         icon: <AiOutlineHome />,
         label: "Home",
         onClick: () => navigate({ to: RouteNames.Home as string }),
      },
      {
         key: RouteNames.FileManagement,
         icon: <ImFilesEmpty />,
         label: "File Management",
         onClick: () => navigate({ to: RouteNames.FileManagement as string }),
      },
      {
         key: RouteNames.UserControl,
         icon: <FaUsersCog />,
         label: "User Control",
         onClick: () => navigate({ to: RouteNames.UserControl as string }),
      },
      {
         key: RouteNames.Statistics,
         icon: <AiOutlineBarChart />,
         label: "Statistics",
         onClick: () => navigate({ to: RouteNames.Statistics as string }),
      },
      {
         key: "logout",
         icon: <AiOutlineLogout />,
         label: "Logout",
         onClick: () => logoutFn(),
      },
   ];

   const menuConfig = items.filter((item) => {
      if (item.key === "logout" && !localStorage.getItem("auth")) return false;
      return true;
   });

   return (
      <div>
         <Header
            style={{
               display: "flex",
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
                  top: 64,
                  left: 0,
                  height: "calc(100vh - 64px)",
                  background: colorBgContainer,
               }}
            >
               <Menu
                  theme="light"
                  mode="inline"
                  selectedKeys={[pathname]}
                  defaultSelectedKeys={[pathname]}
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     height: "100%",
                     gap: "10px",
                     fontSize: "16px",
                  }}
                  items={menuConfig}
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
