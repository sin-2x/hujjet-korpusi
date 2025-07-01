import { authApi } from "@/entities";
import { MainLayout } from "@/widgets";
import { Spin } from "antd";
import React from "react";

export const Home: React.FC = () => {
   const { data: user, isLoading } = authApi.useGetMe();
   if (isLoading) return <Spin size="large" />;

   console.log(user);
   return <MainLayout />;
};
