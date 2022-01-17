import { Button } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const BackButton = ({ ml = "0", mr = "0", mt = "0", mb = "0" }) => {
  const router = useRouter();

  return (
    <Button
      className="btn"
      _hover={{ transform: "translateX(2px)", transition: "all .5s" }}
      size="lg"
      colorScheme="blackAlpha"
      color='blackAlpha.800'
      borderColor={'transparent'}
      ml={ml}
      mt={mt}
      mb={mb}
      mr={mr}
      leftIcon={
        <ArrowBackIcon
        className="btn"
        _hover={{ transform: "translateX(5px)", transition: "all .5s" }}
        w="1.8rem"
        h="1.8rem"
        color='blackAlpha.800'
        borderColor={'transparent'}
        bg='blackAlpha.50'
        />
      }
      onClick={() => router.back()}
      >
      رجوع
    </Button>
  );
};
