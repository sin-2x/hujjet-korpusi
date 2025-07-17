import { AiFillCloseCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import {
   CreateUser,
   DeleteButton,
   searchStore,
   useDeleteUserMutation,
   userControlApi,
} from "@/entities";
import { SearchInput } from "@/features";
import {
   AdminUserControl,
   dataWithKey,
   TableComponent,
   TitlePage,
   useStyle,
   type User,
} from "@/shared";
import { Button, Input, Space, type TableProps } from "antd";
import React from "react";

interface DataType extends User {
   key: React.Key;
}

export const UserControl: React.FC = () => {
   const { styles } = useStyle();

   const [currentPage, setCurrentPage] = React.useState(1);
   const [editing, setEditing] = React.useState<{
      id: string | null;
      data: { [key: string]: string };
   }>({ id: null, data: {} });

   const searhValue = searchStore((state) => state.searchValue);

   const { data, isLoading } = userControlApi.useGetAllUsers(currentPage);
   const { data: searchData, isLoading: searchLoading } =
      userControlApi.useSearchUsers(searhValue);
   const { mutate: deleteUser } = useDeleteUserMutation(
      AdminUserControl.DELETE_USER,
      "users"
   );
   const { mutate: createUser } = userControlApi.useCreateUser();
   const { mutate: updateUser } = userControlApi.useUpdateUser();

   const updateFn = (id: string | number) => {
      console.log(editing);
      updateUser({ id, body: editing.data });
      setEditing({ id: null, data: {} });
   };

   const keyData = React.useMemo(() => {
      return dataWithKey(
         {
            data: data?.results,
            searchData: searchData?.results || [],
         },
         searhValue,
         "username"
      );
   }, [data?.results, searchData?.results, searhValue]);

   const columns: TableProps<DataType>["columns"] = [
      {
         title: "Name",
         dataIndex: "first_name",
         key: "name",
         render: (_, element) =>
            editing.id === element.username ? (
               <Input
                  name="first_name"
                  value={editing.data.first_name}
                  onChange={(e) =>
                     setEditing((prev) => ({
                        ...prev,
                        data: { ...prev.data, first_name: e.target.value },
                     }))
                  }
               />
            ) : (
               element.first_name
            ),
      },
      {
         title: "Surname",
         dataIndex: "last_name",
         key: "surname",
         render: (_, element) =>
            editing.id === element.username ? (
               <Input
                  name="last_name"
                  value={editing.data.last_name}
                  onChange={(e) =>
                     setEditing((prev) => ({
                        ...prev,
                        data: { ...prev.data, last_name: e.target.value },
                     }))
                  }
               />
            ) : (
               element.last_name
            ),
      },
      {
         title: "Username",
         dataIndex: "username",
         key: "username",
         render: (_, element) =>
            editing.id === element.username ? (
               <Input
                  name="username"
                  value={editing.data.username}
                  onChange={(e) =>
                     setEditing((prev) => ({
                        ...prev,
                        data: { ...prev.data, username: e.target.value },
                     }))
                  }
               />
            ) : (
               element.username
            ),
      },
      {
         title: "Action",
         key: "action",
         render: (_, element) => (
            <Space>
               <DeleteButton
                  deleteFn={deleteUser}
                  uuid={element.username}
                  description="Are you sure to delete this user?"
                  title="Delete the user"
               />
               {editing.id === element.username ? (
                  <>
                     <Button
                        type="primary"
                        onClick={() => updateFn(element.id)}
                     >
                        <AiFillCheckCircle />
                     </Button>
                     <Button
                        type="primary"
                        onClick={() => setEditing({ id: null, data: {} })}
                     >
                        <AiFillCloseCircle />
                     </Button>
                  </>
               ) : (
                  <Button
                     type="primary"
                     onClick={() =>
                        setEditing({
                           id: element.username,
                           data: {
                              username: element.username,
                              first_name: element.first_name,
                              last_name: element.last_name,
                           },
                        })
                     }
                  >
                     <FaUserEdit />
                  </Button>
               )}
            </Space>
         ),
      },
   ];

   return (
      <>
         <TitlePage title="User Control">
            <SearchInput />
            <CreateUser createFn={createUser} />
         </TitlePage>
         <TableComponent<DataType>
            columns={columns}
            data={keyData}
            isLoading={isLoading || searchLoading}
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
