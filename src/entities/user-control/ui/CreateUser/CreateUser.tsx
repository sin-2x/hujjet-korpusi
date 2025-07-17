import { AiOutlineUserAdd } from "react-icons/ai";
import { App, Button, Form, Input, Modal, type FormProps } from "antd";
import React, { type PropsWithChildren } from "react";
import type { TCreateUserRes, User } from "@/shared";
import type { UseMutateFunction } from "@tanstack/react-query";

interface IProps {
   createFn: UseMutateFunction<
      TCreateUserRes,
      Error,
      Omit<User, "id">,
      unknown
   >;
}

export const CreateUser: React.FC<PropsWithChildren<IProps>> = ({
   createFn,
}) => {
   const [isModalOpen, setIsModalOpen] = React.useState(false);
   const [form] = Form.useForm();
   const showModal = () => {
      setIsModalOpen(true);
   };
   const { message } = App.useApp();

   const onFinish: FormProps<User>["onFinish"] = (value: Omit<User, "id">) => {
      createFn(value, {
         onSuccess: () => {
            message.success("User created successfully!");
            setIsModalOpen(false);
            form.resetFields();
         },
         onError: () => {
            setIsModalOpen(false);
            message.error("User not created!");
         },
      });
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   return (
      <>
         <Button type="primary" size="large" onClick={showModal}>
            <AiOutlineUserAdd />
            Add user
         </Button>

         <Modal
            title="Basic Modal"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={() => form.submit()}
         >
            <Form
               form={form}
               onFinish={onFinish}
               initialValues={{ remember: true }}
            >
               <Form.Item
                  name="first_name"
                  rules={[
                     {
                        required: true,
                        message: "Please input your first name!",
                     },
                  ]}
               >
                  <Input placeholder="Enter first name" />
               </Form.Item>
               <Form.Item
                  name="last_name"
                  rules={[
                     {
                        required: true,
                        message: "Please input your last name!",
                     },
                  ]}
               >
                  <Input placeholder="Enter last name" />
               </Form.Item>
               <Form.Item
                  name="username"
                  rules={[
                     { required: true, message: "Please input your username!" },
                  ]}
               >
                  <Input placeholder="Enter username" />
               </Form.Item>
               <Form.Item
                  name="password"
                  rules={[
                     { required: true, message: "Please input your password!" },
                  ]}
               >
                  <Input.Password placeholder="Enter password" />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
