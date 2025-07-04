import React from "react";
import { Table } from "antd";
import type { TableProps as AntTableProps } from "antd";

interface TableComponentProps<T extends { key: React.Key }> {
   columns: AntTableProps<T>["columns"];
   data: T[] | undefined;
   isLoading?: boolean;
   pagination?: AntTableProps<T>["pagination"];
   rowSelection?: AntTableProps<T>["rowSelection"];
   rowClassName?: AntTableProps<T>["rowClassName"];
   className?: string;
}

export const TableComponent = <T extends { key: React.Key }>({
   columns,
   data,
   isLoading,
   pagination,
   rowSelection,
   rowClassName,
   className,
}: TableComponentProps<T>) => {
    
   return (
      <Table<T>
         rowSelection={rowSelection}
         columns={columns}
         dataSource={data}
         pagination={pagination}
         className={className}
         scroll={{ y: 90 * 5 }}
         rowClassName={rowClassName}
         loading={isLoading}
      />
   );
};
