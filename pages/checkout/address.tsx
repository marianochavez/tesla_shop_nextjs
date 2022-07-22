import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {useContext, useEffect} from "react";

import {ShopLayout} from "../../components/layouts";
import {countries} from "../../utils";
import {CartContext} from "../../context";
import {FullScreenLoading} from "../../components/ui";

type FormData = {
  name: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    name: Cookies.get("name") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zipCode: Cookies.get("zipCode") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();
  const {numberOfItems, updateAddress} = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  useEffect(() => {
    if (numberOfItems === 0) {
      router.push("/cart/empty");
    }
  }, [router, numberOfItems]);

  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  if (!numberOfItems) {
    return <FullScreenLoading />;
  }

  return (
    <ShopLayout pageDescription="Confirmar dirección del destino" title="Dirección">
      <Text variant="h1">Dirección</Text>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={6} templateColumns={{base: "repeat(1,1fr)", sm: "repeat(2,1fr)"}}>
          <GridItem>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "Este campo debe tener al menos 2 caracteres",
                  },
                })}
              />
              {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel htmlFor="lastName">Apellido</FormLabel>
              <Input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "Este campo debe tener al menos 2 caracteres",
                  },
                })}
              />
              {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.address}>
              <FormLabel htmlFor="address">Dirección</FormLabel>
              <Input
                id="address"
                type="text"
                {...register("address", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 10,
                    message: "Este campo debe tener al menos 10 caracteres",
                  },
                })}
              />
              {errors.address && <FormErrorMessage>{errors.address.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.address2}>
              <FormLabel htmlFor="address2">Dirección 2</FormLabel>
              <Input
                id="address2"
                type="text"
                {...register("address2", {
                  minLength: {
                    value: 10,
                    message: "Este campo debe tener al menos 10 caracteres",
                  },
                })}
              />
              {errors.address2 && <FormErrorMessage>{errors.address2.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.zipCode}>
              <FormLabel htmlFor="zipCode">Código Postal</FormLabel>
              <Input
                id="zipCode"
                type="text"
                {...register("zipCode", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Este campo debe tener al menos 4 caracteres",
                  },
                })}
              />
              {errors.zipCode && <FormErrorMessage>{errors.zipCode.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.city}>
              <FormLabel htmlFor="city">Ciudad</FormLabel>
              <Input
                id="city"
                type="text"
                {...register("city", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 4,
                    message: "Este campo debe tener al menos 4 caracteres",
                  },
                })}
              />
              {errors.city && <FormErrorMessage>{errors.city.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.country}>
              <FormLabel htmlFor="country">País</FormLabel>
              <Select
                id="country"
                placeholder="----"
                {...register("country", {
                  required: "Este campo es requerido",
                })}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.country && <FormErrorMessage>{errors.country.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone">Teléfono</FormLabel>
              <Input
                id="phone"
                type="text"
                {...register("phone", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "Este campo debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.phone && <FormErrorMessage>{errors.phone.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>
        <Box display="flex" justifyContent="center" mt={5}>
          <Button colorScheme="blue" size="lg" type="submit">
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//   const {token = ""} = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
