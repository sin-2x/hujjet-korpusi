import React from "react";
import { Form, Input } from "antd";
import { useDebounce } from "@/shared";
import { searchStore } from "@/entities";

const Search: React.FC = () => {
   const [search, setSearchValue] = React.useState("");
   const debouncedSearchValue = useDebounce(search, 500);
   const { setSearch } = searchStore((state) => state);

   React.useEffect(() => {
      setSearch(debouncedSearchValue);
   }, [debouncedSearchValue, setSearch]);

   const [form] = Form.useForm();

   return (
      <Form form={form} size="large">
         <Form.Item name="search" label="Search">
            <Input
               allowClear
               placeholder="Search..."
               onChange={(e) => setSearchValue(e.target.value)}
            />
         </Form.Item>
      </Form>
   );
};

export const SearchInput = Search;
