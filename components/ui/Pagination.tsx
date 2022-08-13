import {FC} from "react";
import {Button, HStack, Icon, Text, VisuallyHidden} from "@chakra-ui/react";
import {GrFormPrevious, GrFormNext} from "react-icons/gr";
import {BiFirstPage, BiLastPage} from "react-icons/bi";
import {useEffect} from "react";

interface Props {
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  totalProducts?: number;
  imagesLoaded: boolean;
  onClick: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  page,
  hasPrevPage,
  hasNextPage,
  totalPages,
  imagesLoaded,
  onClick,
}) => {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }, [page]);

  return (
    <HStack
      // className="fadeIn"
      display={imagesLoaded ? "flex" : "none"}
      justifyContent="center"
      p={6}
    >
      <Button
        colorScheme="blackAlpha"
        disabled={page === 1}
        variant="ghost"
        onClick={() => onClick(1)}
      >
        <Icon as={BiFirstPage} color="black" fontSize="2xl" />
        <VisuallyHidden>Primera pagina</VisuallyHidden>
      </Button>
      <Button
        colorScheme="blackAlpha"
        disabled={!hasPrevPage}
        variant="ghost"
        onClick={() => onClick(page - 1)}
      >
        <Icon as={GrFormPrevious} fontSize="2xl" />
        <VisuallyHidden>Pagina anterior</VisuallyHidden>
      </Button>

      <Text alignItems="center" display="flex" gap={2} justifyContent="center">
        <span style={{fontWeight: "bold"}}>{page}</span>
        de <span style={{fontWeight: "bold"}}>{totalPages}</span>
      </Text>

      <Button
        colorScheme="blackAlpha"
        disabled={!hasNextPage}
        variant="ghost"
        onClick={() => onClick(page + 1)}
      >
        <Icon as={GrFormNext} fontSize="2xl" />
        <VisuallyHidden>Pagina siguiente</VisuallyHidden>
      </Button>
      <Button
        colorScheme="blackAlpha"
        disabled={page === totalPages}
        variant="ghost"
        onClick={() => onClick(totalPages)}
      >
        <Icon as={BiLastPage} color="black" fontSize="2xl" />
        <VisuallyHidden>Ultima pagina</VisuallyHidden>
      </Button>
    </HStack>
  );
};
