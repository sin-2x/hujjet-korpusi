import {
   $api,
   type LoginReturnType,
   type LoginValueType,
   type RegisterResType,
   type RegisterValueType,
} from "@/shared";

export const authServices = {
   getMe: async () => {
      const response = await $api.get("/auth/profile/");
      return response.data;
   },
   login: async (form: LoginValueType): Promise<LoginReturnType> => {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      const response = await $api.post("/admin/login/", formData);
      return response.data;
   },

   register: async (form: RegisterValueType): Promise<RegisterResType> => {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("password", form.password);
      const response = await $api.post("/auth/register/", formData);
      return response.data;
   },
   logout: async () => {
      const response = await $api.post("/auth/logout/");
      return response.data;
   },
};
