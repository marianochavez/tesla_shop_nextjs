import {SimpleGrid, Icon, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {
  MdAttachMoney,
  MdAvTimer,
  MdCancelPresentation,
  MdCreditCard,
  MdGroup,
  MdOutlineCategory,
  MdOutlineCreditCardOff,
  MdOutlineDashboard,
  MdProductionQuantityLimits,
} from "react-icons/md";
import useSWR from "swr";
import {useEffect} from "react";

import {AdminLayout} from "../../components/layouts";
import {SummaryTitle} from "../../components/admin";
import {IDashboardSummaryResponse} from "../../interfaces";
import {FullScreenLoading} from "../../components/ui";

const DashboardPage = () => {
  const {data, error} = useSWR<IDashboardSummaryResponse>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000, // 30 seconds
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(
      () => setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30)),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!error && !data) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <Text>Error al cargar la información</Text>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  } = data!;

  return (
    <AdminLayout icon={<MdOutlineDashboard />} subTitle="Estadísticas generales" title="Dashboard">
      <SimpleGrid columns={[1, 3, 4]} gap={3}>
        <SummaryTitle
          icon={<Icon as={MdCreditCard} color="blue.600" fontSize={50} />}
          subTitle="Ordenes Totales"
          title={numberOfOrders}
        />
        <SummaryTitle
          icon={<Icon as={MdAttachMoney} color="green.600" fontSize={50} />}
          subTitle="Ordenes Pagadas"
          title={paidOrders}
        />
        <SummaryTitle
          icon={<Icon as={MdOutlineCreditCardOff} color="red.600" fontSize={50} />}
          subTitle="Ordenes Pendientes"
          title={numberOfOrders - paidOrders}
        />
        <SummaryTitle
          icon={<Icon as={MdGroup} color="blackAlpha.600" fontSize={50} />}
          subTitle="Clientes"
          title={numberOfClients}
        />
        <SummaryTitle
          icon={<Icon as={MdOutlineCategory} color="yellow.600" fontSize={50} />}
          subTitle="Productos"
          title={numberOfProducts}
        />
        <SummaryTitle
          icon={<Icon as={MdCancelPresentation} color="red.600" fontSize={50} />}
          subTitle="Sin Existencias"
          title={productsWithNoInventory}
        />
        <SummaryTitle
          icon={<Icon as={MdProductionQuantityLimits} color="yellow.600" fontSize={50} />}
          subTitle="Bajo Inventario"
          title={lowInventory}
        />
        <SummaryTitle
          icon={<Icon as={MdAvTimer} color="blue.600" fontSize={50} />}
          subTitle="Actualización en:"
          title={refreshIn}
        />
      </SimpleGrid>
    </AdminLayout>
  );
};

export default DashboardPage;
