import { BsFiletypeTxt } from "react-icons/bs";
import React, { useState } from "react";
import { Flex, Space, Tag } from "antd";
import { Typography, type TableProps } from "antd";
import {
   DeleteFileButton,
   DownloadButton,
   fileApi,
   SearchFile,
   VerifyButton,
} from "@/entities";
import {
   dataWithKey,
   formatDate,
   TableComponent,
   useDebounce,
   useStyle,
   type File,
} from "@/shared";
import { FaDownload } from "react-icons/fa";

type TableRowSelection<T extends object = object> =
   TableProps<T>["rowSelection"];

interface DataType extends File {
   key: React.Key;
}

export const FileManagement: React.FC = () => {
   const { styles } = useStyle();

   const [currentPage, setCurrentPage] = useState(1);
   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
   const [searchValue, setSearchValue] = useState("");
   const debouncedSearchValue = useDebounce(searchValue, 500);

   const { data, isLoading } = fileApi.useGetAllFilesQuery(currentPage);
   const { mutate: verifyFiles } = fileApi.useVerifyFilesMutation();
   const { mutate: downloadFile } = fileApi.useDownloadFileMutation();
   const { mutate: deleteFile } = fileApi.useDeleteFileMutation();
   const { data: searchData, isLoading: searchLoading } =
      fileApi.useGetSearchFilesQuery(debouncedSearchValue);

   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
   };

   const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   const keyData = dataWithKey(
      {
         data: data?.results,
         searchData: searchData?.results,
      },
      searchValue,
      "uuid"
   );
   const getSelectedVerificationStatus = ():
      | "verified"
      | "unverified"
      | "mixed"
      | null => {
      const selectedItems = keyData?.filter((item) =>
         selectedRowKeys.includes(item.key)
      );
      if (!selectedItems || selectedItems.length === 0) return null;

      const allVerified = selectedItems.every((item) => item.is_verified);
      const allUnverified = selectedItems.every((item) => !item.is_verified);

      if (allVerified) return "verified";
      if (allUnverified) return "unverified";
      return "mixed";
   };

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
         render: (_, element) => {
            return (
               <Space>
                  <DeleteFileButton deleteFile={deleteFile} element={element} />
                  <DownloadButton
                     tooltip="Download file"
                     downloadFile={downloadFile}
                     element={element}
                     endpoint="download_admin_base"
                  >
                     <FaDownload />
                  </DownloadButton>
                  <DownloadButton
                     tooltip="Download txt file"
                     downloadFile={downloadFile}
                     element={element}
                     endpoint="download_admin_txt"
                  >
                     <BsFiletypeTxt />
                  </DownloadButton>
               </Space>
            );
         },
      },
   ];

   return (
      <Flex gap="middle" vertical>
         <Typography.Title level={3}>File management</Typography.Title>
         <Flex gap="middle">
            <SearchFile setSearch={setSearchValue} />
            {(() => {
               const status = getSelectedVerificationStatus();
               if (status === "verified") {
                  return (
                     <VerifyButton
                        verifyFiles={verifyFiles}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        endpoint="false"
                     >
                        Cancel verification
                     </VerifyButton>
                  );
               }
               if (status === "unverified") {
                  return (
                     <VerifyButton
                        verifyFiles={verifyFiles}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        endpoint="true"
                     >
                        Make verification
                     </VerifyButton>
                  );
               }
               return null;
            })()}
         </Flex>

         <TableComponent<DataType>
            rowSelection={rowSelection}
            columns={columns}
            data={keyData}
            pagination={{
               onChange: (current) => setCurrentPage(current),
               showSizeChanger: false,
               current: currentPage,
               total: data?.count,
            }}
            className={styles.customTable}
            rowClassName={(record) =>
               !record.is_verified ? "row-unverified" : "row-verified"
            }
            isLoading={isLoading || searchLoading}
         />
      </Flex>
   );
};
