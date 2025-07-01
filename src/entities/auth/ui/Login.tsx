import React from "react";
import type { FormProps } from "antd";
import { App, Button, Form, Input, Space } from "antd";
import { useRouter } from "@tanstack/react-router";
import { authApi } from "@/entities/auth/api";
import { useAuthStore } from "@/entities";
import { useForm } from "antd/es/form/Form";
import type { LoginValueType } from "@/shared";

export const Login: React.FC = () => {
   const { message } = App.useApp();
   const {
      mutate: login,
      isPending,
      data,
      isSuccess,
   } = authApi.useLoginMutation(message);

   const { setIsAuth, setToken } = useAuthStore();
   const [form] = useForm();
   const { navigate } = useRouter();

   const onFinish: FormProps<LoginValueType>["onFinish"] = (values) => {
      login(values);
   };

   React.useEffect(() => {
      if (isSuccess) {
         setToken(data.token);
         setIsAuth(true);
         form.resetFields();
         navigate({ to: "/statistics" });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, isSuccess, setIsAuth, setToken, login]);

   return (
      <Space
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // height: "100vh",
            width: "100%",
         }}
      >
         <div className="text-2xl font-bold"> Login</div>
         <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            style={{
               width: "300px",
               marginTop: "20px",
            }}
            layout="vertical"
         >
            <Form.Item<LoginValueType>
               label="Username"
               name="username"
               rules={[
                  { required: true, message: "Please input your username!" },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item<LoginValueType>
               label="Password"
               name="password"
               rules={[
                  { required: true, message: "Please input your password!" },
               ]}
            >
               <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
               <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                     width: "100%",
                  }}
                  loading={isPending}
               >
                  Submit
               </Button>
            </Form.Item>
            <Form.Item label={null}>
               <Button
                  type="link"
                  onClick={() => {
                     navigate({ to: "/auth" });
                  }}
                  htmlType="submit"
                  style={{
                     width: "100%",
                  }}
               >
                  Register
               </Button>
            </Form.Item>
         </Form>
      </Space>
   );
};
