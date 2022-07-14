import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";

const AddressPage = () => {
  return (
    <ShopLayout pageDescription="Confirmar dirección del destino" title="Dirección">
      <Text variant="h1">Dirección</Text>

      <Grid gap={6} templateColumns={{base: "repeat(1,1fr)", sm: "repeat(2,1fr)"}}>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input id="name" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="lastName">Apellido</FormLabel>
            <Input id="lastName" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="address">Dirección</FormLabel>
            <Input id="address" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor="address2">Dirección 2</FormLabel>
            <Input id="address2" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="zipCode">Código Postal</FormLabel>
            <Input id="zipCode" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="city">Ciudad</FormLabel>
            <Input id="city" type="text" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="country">País</FormLabel>
            <Select id="country" placeholder="----">
              <option value={1}>Costa Rica</option>
              <option value={2}>Honduras</option>
              <option value={3}>El Salvador</option>
              <option value={4}>México</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel htmlFor="phone">Teléfono</FormLabel>
            <Input id="phone" type="text" />
          </FormControl>
        </GridItem>
      </Grid>

      <Box display="flex" justifyContent="center" mt={5}>
        <Button colorScheme="blue" size="lg">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
