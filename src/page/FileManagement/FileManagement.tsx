import React, { useState } from "react";
import { Button, Flex, Tag } from "antd";
import { type TableProps } from "antd";
import {
   DeleteButton,
   DownloadButton,
   fileApi,
   JsonViewButton,
   searchStore,
   useDeleteUserMutation,
   VerifyButton,
} from "@/entities";
import {
   AdminFileControl,
   dataWithKey,
   formatDate,
   TableComponent,
   TitlePage,
   useStyle,
   type File,
   type JsonViewData,
} from "@/shared";
import { FaDownload } from "react-icons/fa";
import { SearchInput } from "@/features";
import { BsFiletypeTxt } from "react-icons/bs";

type TableRowSelection<T extends object = object> =
   TableProps<T>["rowSelection"];

interface DataType extends File {
   key: React.Key;
}

export const FileManagement: React.FC = () => {
   const { styles } = useStyle();

   const [currentPage, setCurrentPage] = useState(1);
   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

   const searchValue = searchStore((state) => state.searchValue);

   const { data, isLoading } = fileApi.useGetAllFilesQuery(currentPage);
   const { mutate: verifyFiles } = fileApi.useVerifyFilesMutation();
   const { mutate: downloadFile } = fileApi.useDownloadFileMutation();
   const { mutate: deleteFile } = useDeleteUserMutation(
      AdminFileControl.DELETE_FILE,
      "files"
   );
   const { data: searchData, isLoading: searchLoading } =
      fileApi.useGetSearchFilesQuery(searchValue);
   const { mutate: downloadMergedFn } = fileApi.useDownloadMergedFilesQuery();
   const {
      mutate: downloadJsonFn,
      data: jsonData,
      isPending: jsonLoading,
   } = fileApi.useDownloadJsonFileQuery();

   const handleDownloadMerged = () => {
      downloadMergedFn();
   };

   const handleViewJson = React.useCallback((uuid: string) => {
      downloadJsonFn(uuid);
   }, []);

   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
   };

   const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   const keyData = React.useMemo(() => {
      return dataWithKey(
         {
            data: data?.results,
            searchData: searchData?.results || [],
         },
         searchValue,
         "uuid"
      );
   }, [data?.results, searchData?.results, searchValue]);

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
         fixed: "left",
         width: 200,
      },
      {
         title: "File size",
         dataIndex: "file_size",
         key: "file_size",
         render: (text) => <>{text}b</>,
         width: 150,
      },
      {
         title: " Sign count",
         dataIndex: "token_count",
         key: "token_count",
         render: (text) => <>{text}</>,
         width: 150,
      },
      {
         title: " Vocab count",
         dataIndex: "vocab_count",
         key: "vocab_count",
         render: (text) => <>{text}</>,
         width: 150,
      },
      {
         title: "Sentence count",
         dataIndex: "sentence_count",
         key: "sentence_count",
         render: (text) => <>{text}</>,
         width: 150,
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
         width: 150,
      },
      {
         title: "Description",
         dataIndex: "description",
         key: "description",
         render: (text) => <>{text}</>,
         width: 150,
      },
      {
         title: "Created at",
         dataIndex: "created_at",
         key: "created_at",
         render: (text) => <>{formatDate(text)}</>,
         width: 150,
      },
      {
         title: "Action",
         key: "action",
         fixed: "right",
         render: (_, element) => {
            return (
               <div className="flex ">
                  <DeleteButton
                     deleteFn={deleteFile}
                     uuid={element.uuid}
                     title="Delete file"
                     description="Are you sure you want to delete this file?"
                  />
                  <DownloadButton
                     tooltip="Download file"
                     downloadFile={downloadFile}
                     element={element}
                     endpoint={AdminFileControl.DOWNLOAD_ORIGINAL_FILE}
                  >
                     <FaDownload />
                  </DownloadButton>
                  <DownloadButton
                     tooltip="Download txt file"
                     downloadFile={downloadFile}
                     element={element}
                     endpoint={AdminFileControl.DOWNLOAD_TXT_FILE}
                  >
                     <BsFiletypeTxt />
                  </DownloadButton>
                  <JsonViewButton
                     downloadJsonFn={() => handleViewJson(element.uuid)}
                     uuid={element.uuid}
                     data={jsonData as JsonViewData}
                     isLoading={jsonLoading}
                  />
               </div>
            );
         },
      },
   ];

   return (
      <Flex gap="middle" vertical>
         <TitlePage title={"File management"}>
            <SearchInput />
            <Button onClick={handleDownloadMerged} type="primary" size="large">
               Download merged files
               <BsFiletypeTxt />
            </Button>
            <Flex gap="middle">
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
         </TitlePage>

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
