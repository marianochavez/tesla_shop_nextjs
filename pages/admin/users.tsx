import React, {useEffect} from "react";
import {MdPeople} from "react-icons/md";
import Table from "rc-table";
import {Box, Select} from "@chakra-ui/react";
import useSWR from "swr";
import {useState} from "react";

import {AdminLayout} from "../../components/layouts";
import {FullScreenLoading} from "../../components/ui";
import {IUser} from "../../interfaces";
import {teslaApi} from "../../api";

const UsersPage = () => {
  const {data, error} = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

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
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      align: "left",
      className: "order-table-column",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      align: "left",
      className: "order-table-column",
    },
    {
      key: "role",
      title: "Rol",
      align: "left",
      className: "order-table-column",
      render: (params: any) => {
        return (
          <Select
            value={params.role}
            w="150px"
            onChange={({target}) => onRoleUpdated(params.id, target.value)}
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
    key: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout icon={<MdPeople />} subTitle="Mantenimiento de usuarios" title="Usuarios">
      <Box alignItems="center" className="fadeIn" display="flex" justifyContent="center" w="100%">
        <Table
          className="order-table"
          columns={columns}
          data={rows}
          scroll={{x: 700, y: 400}}
          style={{width: "100%"}}
        />
      </Box>
    </AdminLayout>
  );
};

export default UsersPage;
