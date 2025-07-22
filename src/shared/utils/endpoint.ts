export enum AdminAuthEndpoints {
   LOGIN = "admin/login/",
   LOGOUT = "admin/logout/",
}
export enum AdminUserControl {
   GET_USERS = "admin/users/",
   SEARCH_USERS = "admin/search_user/",
   DELETE_USER = "admin/delete_user/",
   CREATE_NEW_USER = "admin/create_user/",
   UPDATE_USER = "admin/change_user/",
}
export enum AdminFileControl {
   GET_FILES = "admin/files/",
   GET_SEARCH_FILES = "admin/search_files/",
   VERIFY_FILE = "admin/verify/",
   DELETE_FILE = "admin/delete_file/",
   DOWNLOAD_ORIGINAL_FILE = "admin/download_admin_base/",
   DOWNLOAD_TXT_FILE = "admin/download_admin_txt/",
   DOWNLOAD_MERGED_TXT = "admin/download_merged_txt/",
   DOWNLOAD_JSON_TXT_FILE = "admin/text/",
   START_MERGE = "admin/start_merge/",
   TASK_STATUS = "admin/task_status/",
   DOWNLOAD_MERGED_FILE = "admin/download-merged/",
}
export enum AdminStatistics {
   GET_STATISTICS = "admin/statistika/",
}
export type DeleteType =
   | AdminUserControl.DELETE_USER
   | AdminFileControl.DELETE_FILE;
