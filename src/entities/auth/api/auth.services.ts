import {
   $api,
   AdminAuthEndpoints,
   type LoginReturnType,
   type LoginValueType,
} from "@/shared";

export const authServices = {
   login: async (form: LoginValueType): Promise<LoginReturnType> => {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      const response = await $api.post(AdminAuthEndpoints.LOGIN, form);
      return response.data;
   },
   logout: async () => {
      const response = await $api.post(AdminAuthEndpoints.LOGOUT);
      return response.data;
   },
};
