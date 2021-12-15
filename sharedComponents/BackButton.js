import { Button } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const BackButton = ({ ml = "0", mr = "0", mt = "0", mb = "0" }) => {
  const router = useRouter();

  const color = "gray.400";
  return (
    <Button
      className="hvr hvr-backward"
      size="lg"
      colorScheme="gray"
      color
      borderColor={color}
      ml={ml}
      mt={mt}
      mb={mb}
      mr={mr}
      leftIcon={
        <ArrowBackIcon
          className="hvr hvr-backward"
          w="1.5rem"
          h="1.5rem"
          color
        />
      }
      onClick={() => router.back()}
    >
      رجوع
    </Button>
  );
};
