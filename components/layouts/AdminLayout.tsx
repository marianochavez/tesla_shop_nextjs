import {Box, Text} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

import {AdminNavbar} from "../admin";
import {SideMenu} from "../ui";

interface Props {
  children: ReactNode;
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({children, title, subTitle, icon}) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: "20px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Box>
          <Box alignItems="center" display="flex" flexDir="row">
            <Text variant="h1">{icon}</Text>
            <Text variant="h1">{title}</Text>
          </Box>
          <Text mb={2} variant="h2">
            {subTitle}
          </Text>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
