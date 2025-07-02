import React, { useState } from "react";
import { Button, Flex, Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";

import { createStyles } from "antd-style";
import { fileApi } from "@/entities";
import { formatDate, type File } from "@/shared";
const useStyle = createStyles(({ css, token }) => {
   const { antCls } = token as unknown as { antCls: string };
   return {
      customTable: css`
         ${antCls}-table {
            ${antCls}-table-container {
               ${antCls}-table-body,
               ${antCls}-table-content {
                  scrollbar-width: thin;
                  scrollbar-color: #eaeaea transparent;
                  scrollbar-gutter: stable;
               }
            }
         }

         .row-unverified {
            background-color: #fff1f0 !important;
         }
      `,
   };
});

type TableRowSelection<T extends object = object> =
   TableProps<T>["rowSelection"];

interface DataType extends Omit<File, "uuid" | "file_path"> {
   key: React.Key;
}

// const columns: TableColumnsType<DataType> = [
//    { title: "Title", dataIndex: "title" },
//    { title: "Content", dataIndex: "content" },
//    { title: "File size", dataIndex: "file_size" },
//    { title: "File type", dataIndex: "file_type" },
//    { title: "Verified", dataIndex: "verified" },
//    { title: "Status", dataIndex: "status" },
//    { title: "Created at", dataIndex: "created_at" },
//    { title: "Actions", dataIndex: "actions" },
// ];
const columns: TableProps<DataType>["columns"] = [
   {
      title: "Title",
      dataIndex: "title",
      key: "name",
      render: (text) => <>{text}</>,
   },
   {
      title: "Content",
      dataIndex: "content",
      key: "content",
   },
   {
      title: "File size",
      dataIndex: "file_size",
      key: "file_size",
      render: (text) => <>{text}b</>,
   },
   {
      title: "File type",
      dataIndex: "file_type",
      key: "file_type",
      render: (_, text) => {
         switch (text.file_type) {
            case "doc":
               return <Tag color="blue">doc</Tag>;
            case "docx":
               return <Tag color="blue">docx</Tag>;
            case "pdf":
               return <Tag color="red">pdf</Tag>;
            case "xlsx":
               return <Tag color="green">xls</Tag>;
         }
      },
   },
   {
      title: "Status",
      dataIndex: "status",
      key: "status",
   },
   {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <>{formatDate(text)}</>,
   },
   {
      title: "Action",
      key: "action",
      render: (_, element) => (
         <Space>
            <Button type="primary" danger>
               удалить
            </Button>
            <Button
               type="primary"
               download={element.download_url}
               disabled={!element.download_url}
            >
               скачать
            </Button>
         </Space>
      ),
   },
];
export const FileManagement: React.FC = () => {
   const { data, isError } = fileApi.useGetAllFilesQuery();
   console.log(data);
   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
   const { styles } = useStyle();

   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
   };

   const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   //    const dataSource = React.useMemo(() => {
   //       const tableData = data?.results.map<Record<keyof DataType, unknown>>(
   //          (element, i) => ({
   //             key: i,
   //             title: element.title,
   //             content: element.content,
   //             file_size: element.file_size,
   //             file_type: element.file_type,
   //             verified: element.verified ? "да" : "нет",
   //             status: element.status,
   //             created_at: formatDate(element.created_at),
   //             actions: (
   //                <Space>
   //                   <Button type="primary" danger>
   //                      удалить
   //                   </Button>
   //                   <Button
   //                      type="primary"
   //                      download={element.download_url}
   //                      disabled={!element.download_url}
   //                   >
   //                      скачать
   //                   </Button>
   //                </Space>
   //             ),
   //          })
   //       );

   //       return tableData || [];
   //    }, [data?.results]);

   const keyData = data?.results?.map((elements) => {
      return {
         key: elements.uuid,
         ...elements,
      };
   });

   if (isError) return <Spin size="large" />;

   const hasSelected = selectedRowKeys.length > 0;

   return (
      <Flex gap="middle" vertical>
         <Flex align="center" gap="middle">
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
         </Flex>
         <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={keyData}
            pagination={{
               pageSize: 10,
            }}
            className={styles.customTable}
            scroll={{ y: 80 * 5 }}
            rowClassName={(record) => (!record.verified ? "row-unverified" : "")}
         />
      </Flex>
   );
};
