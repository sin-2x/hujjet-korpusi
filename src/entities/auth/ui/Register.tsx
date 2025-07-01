import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Space } from "antd";
import { useRouter } from "@tanstack/react-router";
import { authApi } from "@/entities/auth/api";
import type { RegisterValueType } from "@/shared";
import { useAuthStore } from "@/entities";
import { useForm } from "antd/es/form/Form";

export const Register: React.FC = () => {
   const {
      mutate: register,
      isPending,
      data,
      isSuccess,
   } = authApi.useRegisterMutation();
   const { setToken, setIsAuth } = useAuthStore();

   const [form] = useForm();
   const { navigate } = useRouter();

   const onFinish: FormProps<RegisterValueType>["onFinish"] = (values) => {
      register(values);
   };

   React.useEffect(() => {
      if (isSuccess) {
         setIsAuth(true);
         setToken(data.token);
         navigate({ to: "/" });
         form.resetFields();
      }
   }, [data, register, isSuccess, setIsAuth, setToken]);

   return (
      <Space
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
         }}
      >
         <div className="text-2xl font-bold"> Register</div>
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
            <Form.Item<RegisterValueType>
               label="Name"
               name="first_name"
               rules={[
                  { required: true, message: "Please input your username!" },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item<RegisterValueType>
               label="Surname"
               name="last_name"
               rules={[
                  { required: true, message: "Please input your surname!" },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item<RegisterValueType>
               label="Username"
               name="username"
               rules={[
                  { required: true, message: "Please input your username!" },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item<RegisterValueType>
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
                     navigate({ to: "/login" });
                  }}
                  htmlType="submit"
                  style={{
                     width: "100%",
                  }}
               >
                  Login
               </Button>
            </Form.Item>
         </Form>
      </Space>
   );
};
