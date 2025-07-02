import { $api, type LoginReturnType, type LoginValueType } from "@/shared";

export const authServices = {
   getMe: async () => {
      const response = await $api.get("/auth/profile/");
      return response.data;
   },
   login: async (form: LoginValueType): Promise<LoginReturnType> => {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      const response = await $api.post("/admin/login", form);
      return response.data;
   },
   logout: async () => {
      const response = await $api.post("/auth/logout/");
      return response.data;
   },
};
