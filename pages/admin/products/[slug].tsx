import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import {GetServerSideProps, NextPage} from "next";
import {useForm} from "react-hook-form";
import {MdEdit, MdOutlineSave, MdUpload} from "react-icons/md";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {AdminLayout} from "../../../components/layouts";
import {dbProducts} from "../../../database";
import {IProduct} from "../../../interfaces";
import {teslaApi} from "../../../api";
import {Product} from "../../../models";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: NextPage<Props> = ({product}) => {
  const router = useRouter();
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    // observable
    const subscription = watch((value, {name}) => {
      if (name === "title") {
        const newSlug =
          value.title?.trim().replaceAll(" ", "_").replaceAll("'", "").toLocaleLowerCase() || "";

        setValue("slug", newSlug, {shouldValidate: true});
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");

    if (currentSizes.includes(size)) {
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        {shouldValidate: true},
      );
    }
    setValue("sizes", [...currentSizes, size], {shouldValidate: true});
  };

  const onNewTag = (tag: string) => {
    const currentTags = getValues("tags");
    const newTag = tag.trim().toLocaleLowerCase();

    setNewTagValue("");
    if (currentTags.includes(newTag)) return;
    setValue("tags", [...currentTags, newTag], {shouldValidate: true});
  };

  const onDeleteTag = (tag: string) => {
    const currentTags = getValues("tags");
    const deleteTag = tag.trim().toLocaleLowerCase();

    setValue(
      "tags",
      currentTags.filter((t) => t !== deleteTag),
      {shouldValidate: true},
    );
  };

  const onSubmit = async (formData: FormData) => {
    if (formData.images.length < 2) return alert("Please upload at least 2 images");
    setIsSaving(true);

    try {
      const {data} = await teslaApi({
        url: "/admin/products",
        method: formData._id ? "PUT" : "POST",
        data: formData,
      });

      if (!formData._id) {
        router.replace(`/admin/products/${data.slug}`);
      }
      setIsSaving(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout icon={<MdEdit />} subTitle={`Editando: ${product.title}`} title="Producto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" mb={2}>
          <Button
            colorScheme="green"
            disabled={isSaving}
            isLoading={isSaving}
            leftIcon={<Icon as={MdOutlineSave} fontSize="lg" />}
            type="submit"
            w="150px"
          >
            Guardar
          </Button>
        </Box>

        <Grid
          gap={2}
          templateColumns={{base: "repeat(1,1fr)", sm: "repeat(1,1fr)", md: "repeat(2,1fr)"}}
        >
          <GridItem>
            <FormControl isInvalid={!!errors.title} mb={2}>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Input
                id="title"
                type="text"
                variant="filled"
                {...register("title", {
                  required: "Este campo es requerido",
                  minLength: {value: 2, message: "El título debe tener al menos 2 caracteres"},
                })}
              />
              {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.description} mb={2}>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                id="description"
                variant="filled"
                {...register("description", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.description && (
                <FormErrorMessage>{errors.description.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.inStock} mb={2}>
              <FormLabel htmlFor="inStock">Inventario</FormLabel>
              <Input
                id="inStock"
                type="number"
                variant="filled"
                {...register("inStock", {
                  required: "Este campo es requerido",
                  min: {value: 0, message: "El inventario debe ser mayor a 0"},
                })}
              />
              {errors.inStock && <FormErrorMessage>{errors.inStock.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.price} mb={2}>
              <FormLabel htmlFor="price">Precio</FormLabel>
              <Input
                id="price"
                type="number"
                variant="filled"
                {...register("price", {
                  required: "Este campo es requerido",
                  min: {value: 0, message: "El precio debe ser mayor a 0"},
                })}
              />
              {errors.price && <FormErrorMessage>{errors.price.message}</FormErrorMessage>}
            </FormControl>

            <Divider my={2} />

            <FormControl isInvalid={!!errors.type} mb={2}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                value={getValues("type")}
                onChange={(value) => setValue("type", value, {shouldValidate: true})}
              >
                <Stack direction="row" spacing={5}>
                  {validTypes.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.gender} mb={2}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                value={getValues("gender")}
                onChange={(value) => setValue("gender", value, {shouldValidate: true})}
              >
                <Stack direction="row" spacing={5}>
                  {validGender.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl isInvalid={!!errors.sizes} mb={2}>
              <FormLabel>Tallas</FormLabel>
              <Stack>
                {validSizes.map((size) => (
                  <Checkbox
                    key={size}
                    isChecked={getValues("sizes").includes(size)}
                    onChange={() => onChangeSize(size)}
                  >
                    {size}
                  </Checkbox>
                ))}
              </Stack>
            </FormControl>
          </GridItem>

          {/* Tags - Images */}
          <GridItem>
            <FormControl isInvalid={!!errors.slug} mb={2}>
              <FormLabel htmlFor="slug">Slug - URL</FormLabel>
              <Input
                id="slug"
                type="text"
                variant="filled"
                {...register("slug", {
                  required: "Este campo es requerido",
                  validate: (val) =>
                    val.trim().includes(" ") ? "No se permiten espacios en el slug" : undefined,
                })}
              />
              {errors.slug && <FormErrorMessage>{errors.slug.message}</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="tags">Etiquetas</FormLabel>
              <Input
                id="tags"
                placeholder="Preciona [spacebar] para agregar"
                type="string"
                value={newTagValue}
                variant="filled"
                onChange={({target}) => setNewTagValue(target.value)}
                onKeyUp={({code, target}) => {
                  if (code === "Space") {
                    onNewTag(target.value);
                  }
                }}
              />
            </FormControl>

            <Box display="flex" flexWrap="wrap" mt={4} p={0}>
              {getValues("tags").map((tag) => {
                return (
                  <Tag key={tag} backgroundColor="gray.700" color="white" ml={1} mt={1} size="sm">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => onDeleteTag(tag)} />
                  </Tag>
                );
              })}
            </Box>

            <Divider my={2} />

            <Stack flexDir="column">
              <FormLabel mb={1}>Imágenes</FormLabel>
              <Button colorScheme="orange" leftIcon={<Icon as={MdUpload} fontSize="lg" />} w="100%">
                Cargar imagen
              </Button>

              <Tag
                colorScheme="red"
                fontWeight="bold"
                justifyContent="center"
                p={2}
                variant="outline"
              >
                Es necesario al menos 2 imagenes
              </Tag>

              <Grid gap={2} templateColumns={["repeat(4,1fr)"]}>
                {product.images.map((img) => (
                  <GridItem key={img} display="flex" flexDir="column" justifyContent="center">
                    <Image
                      alt={product.title}
                      borderRadius="7px"
                      className="fadeIn"
                      src={`/products/${img}`}
                    />
                    <Button colorScheme="red" mt={1}>
                      Borrar
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </Stack>
          </GridItem>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {slug = ""} = query;

  let product: IProduct | null;

  if (slug === "new") {
    // Create new product
    const tempProduct = JSON.parse(JSON.stringify(new Product()));

    delete tempProduct._id;
    tempProduct.images = ["img1.jpg", "img2.jpg"];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
