import { Form, Input } from "antd";
import React from "react";

interface IProps {
   setSearch: (value: string) => void;
}

export const SearchFile: React.FC<IProps> = ({ setSearch }) => {
   const [form] = Form.useForm();
   return (
      <Form form={form} size="large">
         <Form.Item name="search" label="Search">
            <Input
               allowClear
               placeholder="Search..."
               onChange={(e) => setSearch(e.target.value)}
            />
         </Form.Item>
      </Form>
   );
};
