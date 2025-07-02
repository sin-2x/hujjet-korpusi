import dayjs from "dayjs";

export const formatDate = (dateString: string) =>
   dayjs(dateString).format("DD.MM.YYYY HH:mm");
