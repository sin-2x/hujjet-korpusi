import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";
import { PlusOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/userControl/")({
   component: RouteComponent,
   //beforeLoad: authGuard,
});

import { Button, Flex, Input, Modal, Space, Table, Tag } from 'antd';
import { useState } from "react";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function RouteComponent() {

   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
     setIsModalOpen(true);
   };

   const handleOk = () => {
     setIsModalOpen(false);
   };

   const handleCancel = () => {
     setIsModalOpen(false);
   };

   return (
      <>
      <div className="p-6">
         <Flex justify="space-between" align="center">
            <h1 className="text-2xl font-semibold mb-6">Управление пользователями</h1>
            <Button title="Add new user" icon={<PlusOutlined />} type="primary" onClick={showModal}></Button>
            <Modal
              title="Basic Modal"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
               <Space direction="vertical" style={{ width: '100%' }}>
                  <Input placeholder="Name" />
                  <Input placeholder="Surname" />
                  <Input placeholder="Username" />
                  <Input.Password placeholder="Password" />
               </Space>
            </Modal>
         </Flex>

         <Table<DataType> dataSource={data} style={{marginTop: 16}}>
           <ColumnGroup title="Name">
             <Column title="First Name" dataIndex="firstName" key="firstName" />
             <Column title="Last Name" dataIndex="lastName" key="lastName" />
           </ColumnGroup>
           <Column title="Age" dataIndex="age" key="age" />
           <Column title="Address" dataIndex="address" key="address" />
           <Column
             title="Tags"
             dataIndex="tags"
             key="tags"
             render={(tags: string[]) => (
               <>
                 {tags.map((tag) => {
                   let color = tag.length > 5 ? 'geekblue' : 'green';
                   if (tag === 'loser') {
                     color = 'volcano';
                   }
                   return (
                     <Tag color={color} key={tag}>
                       {tag.toUpperCase()}
                     </Tag>
                   );
                 })}
               </>
             )}
           />
           <Column
             title="Action"
             key="action"
             render={(_: any, record: DataType) => (
               <Space size="middle">
                 <a>Edit</a>
                 <a>Block</a>
                 <a>Delete</a>
               </Space>
             )}
           />
         </Table>
      </div>
      </>
   )
}
