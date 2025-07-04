import { userControlApi } from "@/entities/user-control/api/user-control.api";
import { dataWithKey, TableComponent, useStyle, type User } from "@/shared";
import type { TableProps } from "antd";
import React from "react";

interface DataType extends User {
   key: React.Key;
}

export const UserControl: React.FC = () => {
   const { styles } = useStyle();

   const [currentPage, setCurrentPage] = React.useState(1);

   const { data, isLoading } = userControlApi.useGetAllUsers(currentPage);

   const keyData = dataWithKey(
      {
         data: data?.results,
         searchData: [],
      },
      null,
      "id"
   );

   const columns: TableProps<DataType>["columns"] = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
         render: (text) => <>{text}</>,
      },
      {
         title: "Surname",
         dataIndex: "surname",
         key: "surname",
      },
      {
         title: "Username",
         dataIndex: "username",
         key: "username",
         render: (text) => <>{text}b</>,
      },
      {
         title: "Password",
         dataIndex: "password",
         key: "password",
      },
      {
         title: "Action",
         key: "action",
      },
   ];

   return (
      <>
         <TableComponent<DataType>
            columns={columns}
            data={keyData}
            isLoading={isLoading}
            className={styles.customTable}
            pagination={{
               onChange: (current) => setCurrentPage(current),
               showSizeChanger: false,
               current: currentPage,
               total: data?.count,
            }}
         />
      </>
   );
};
