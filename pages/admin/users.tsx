import React, {useContext, useEffect} from "react";
import {MdPeople} from "react-icons/md";
import {Box, Select} from "@chakra-ui/react";
import useSWR from "swr";
import {useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";

import {AdminLayout} from "../../components/layouts";
import {FullScreenLoading} from "../../components/ui";
import {IUser} from "../../interfaces";
import {teslaApi} from "../../api";
import {dbUsers} from "../../database";
import {AuthContext} from "../../context";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColDef = {
  width: 300,
  filter: true,
  sortable: true,
  resizable: true,
};

interface Props {
  validUser: boolean;
}

const UsersPage: NextPage<Props> = ({validUser}) => {
  const {logoutUser} = useContext(AuthContext);
  const {data, error} = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!validUser) {
      logoutUser();
    }
  }, [validUser, logoutUser]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data && !error) {
    return <FullScreenLoading />;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({...user}));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await teslaApi.put("/admin/users", {
        userId,
        role: newRole,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setUsers(previousUsers);
      alert("Error al actualizar el rol del usuario");
    }
  };

  const columns: any = [
    {field: "email", headerName: "Email", flex: 1, minWidth: 300},
    {field: "name", headerName: "Name", flex: 1, minWidth: 200},
    {
      field: "role",
      headerName: "Rol",
      cellRenderer: ({data}: any) => {
        return (
          <Select
            value={data.role}
            w="150px"
            onChange={({target}) => onRoleUpdated(data.id, target.value)}
          >
            <option value="admin">Admin</option>
            <option value="client">Client</option>
            <option value="superuser">Super User</option>
            <option value="SEO">SEO</option>
          </Select>
        );
      },
    },
  ];

  const rows: any = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout icon={<MdPeople />} subTitle="Mantenimiento de usuarios" title="Usuarios">
      <Box className="fadeIn ag-theme-alpine" h="calc(100vh - 170px)">
        <AgGridReact
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationAutoPageSize={true}
          rowData={rows}
          rowSelection={"single"}
        />
      </Box>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }
  const validUser = await dbUsers.checkUserById(session.user._id);

  return {
    props: {
      validUser,
    },
  };
};

export default UsersPage;
