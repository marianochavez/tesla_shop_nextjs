import {FC} from "react";
import {Button, HStack, Icon, Text} from "@chakra-ui/react";
import {GrFormPrevious, GrFormNext} from "react-icons/gr";
import {BiFirstPage, BiLastPage} from "react-icons/bi";

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
  return (
    <HStack className="fadeIn" display={imagesLoaded ? "flex" : "none"} justifyContent="end" p={6}>
      <Button
        colorScheme="blackAlpha"
        disabled={page === 1}
        variant="ghost"
        onClick={() => onClick(1)}
      >
        <Icon as={BiFirstPage} color="black" fontSize="2xl" />
      </Button>
      <Button
        colorScheme="blackAlpha"
        disabled={!hasPrevPage}
        variant="ghost"
        onClick={() => onClick(page - 1)}
      >
        <Icon as={GrFormPrevious} fontSize="2xl" />
      </Button>

      <Text>
        <span style={{fontWeight: "bold"}}>{page} </span>
        de <span style={{fontWeight: "bold"}}>{totalPages}</span>
      </Text>

      <Button
        colorScheme="blackAlpha"
        disabled={!hasNextPage}
        variant="ghost"
        onClick={() => onClick(page + 1)}
      >
        <Icon as={GrFormNext} fontSize="2xl" />
      </Button>
      <Button
        colorScheme="blackAlpha"
        disabled={page === totalPages}
        variant="ghost"
        onClick={() => onClick(totalPages)}
      >
        <Icon as={BiLastPage} color="black" fontSize="2xl" />
      </Button>
    </HStack>
  );
};
