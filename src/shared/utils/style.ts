import { createStyles } from "antd-style";

export const useStyle = createStyles(({ css, token }) => {
   const { antCls } = token as unknown as { antCls: string };
   return {
      customTable: css`
         ${antCls}-table {
            ${antCls}-table-container {
               ${antCls}-table-body,
               ${antCls}-table-content {
                  scrollbar-width: thin;
                  scrollbar-color: #eaeaea transparent;
                  scrollbar-gutter: stable;
               }
            }
         }

         .row-unverified {
            background-color: #fddede !important;
         }
         .row-verified {
            background-color: #c5ffd0 !important;
         }
      `,
   };
});
