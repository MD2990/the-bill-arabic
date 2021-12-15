import React from "react";
import { Center, Box } from "@chakra-ui/layout";
import { Field } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { VscClearAll } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";

import {
  FormControl as FC,
  Select,
  Textarea,
  WrapItem,
} from "@chakra-ui/react";

import {
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Loader from "react-loader-spinner";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";

export const Confirm = ({
  title = "",
  message = "Are you sure that you want\
 to permanently delete the selected\
						element?".toUpperCase(),
  handelOK,
  handelNO = function () {
    return;
  },
}) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: handelOK,
      },
      {
        label: "No",
        onClick: handelNO,
      },
    ],
  });
};

export function Title({ title, children }) {
  return (
    <Center mt="8%" mb="0%">
      <Text
        style={{ textShadow: "2px 2px 14px white" }}
        textAlign="center"
        textOverflow="ellipsis"
        fontSize={60}
        fontFamily="initial"
        color={"twitter.400"}
        fontWeight={"black"}
        letterSpacing="1.0px"
        textTransform="capitalize"
        borderTopRadius="3xl"
        pl="4"
        pr="4"
        userSelect="none"
        bgGradient="linear(to-t, white,blue.100)"
      >
        {title}
      </Text>
      {children}
    </Center>
  );
}

export function Loaders({ type = "Puff" }) {
  return (
    <Center marginTop="15%">
      <Loader
        type={type}
        color="#1e81b0"
        height={100}
        width={100}
        timeout={10000} //3 secs
      />
    </Center>
  );
}

export function PrintBtn({ click, size = "lg", colorScheme = "green" }) {
  return (
    <>
      <Button
        variant="outline"
        size={size}
        leftIcon={<CalendarIcon />}
        className="hvr-grow"
        onClick={() => click()}
        colorScheme={colorScheme}
      >
        Print
      </Button>
    </>
  );
}

export function Btn({ click, title, color = "twitter", icon }) {
  return (
    <Button
      leftIcon={icon}
      className="hvr-grow"
      size="lg"
      colorScheme={color}
      variant="outline"
      onClick={() => click()}
    >
      {title}
    </Button>
  );
}

export function Spans() {
  return (
    <Center mt={200}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Center>
  );
}

export function MySkeletons() {
  const Skeletons = () => (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="2xl">
      <Skeleton
        height="20px"
        startColor="green.50"
        endColor="blue.300"
        borderRadius="2xl"
        mb="7"
        mt="2"
        h="8"
      />
      <SkeletonCircle
        size="12"
        startColor="green.50"
        endColor="blue.300"
        w="44"
        ml="8"
      />
      <SkeletonText
        startColor="green.50"
        endColor="blue.300"
        mt="4"
        noOfLines={6}
        spacing="6"
        h="15rem"
        w="15rem"
      />
    </Box>
  );
  return (
    <Wrap
      justify="center"
      textAlign="center"
      spacing="9"
      mt="10rem"
      ml="auto"
      mr="auto"
    >
      <Skeletons />
      <Skeletons />
      <Skeletons />
    </Wrap>
  );
}

export function SearchInputField({ theValue, onChange }) {
  return (
    <Input
      rounded="full"
      fontSize="x-large"
      textAlign="center"
      p="4"
      size="lg"
      type="text"
      placeholder="Search by any field"
      value={theValue}
      onChange={onChange}
    />
  );
}

export const CustomField = ({
  fieldName,
  labelName,
  type = "text",
  disabled = false,

}) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel fontSize="larger" fontWeight="bold" htmlFor={fieldName}>
              {labelName}
            </FormLabel>
            <Input
              textAlign="right"
              disabled={disabled}
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
              type={type}
             
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};
export const CustomTextArea = ({ fieldName, labelName }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel fontSize="larger" fontWeight="bold" htmlFor={fieldName}>
              {labelName}
            </FormLabel>
            <Textarea
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
             
            />
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};



export const CustomDropdown = ({ fieldName, labelName, children }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel fontSize="larger" fontWeight="bold" htmlFor={fieldName}>
              {labelName}
            </FormLabel>
            <Select
              w="252px"
              {...field}
              id="fieldName"
              placeholder="ـــ"
              size="lg"
            >
              {children}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};

export const DateField = () => {
  <WrapItem>
    <Field name="added_date">
      {({ field, form }) => (
        <FC isInvalid={form.errors.added_date && form.touched.added_date}>
          <FormLabel fontSize="larger" fontWeight="bold" htmlFor="added_date">
            Added Date
          </FormLabel>
          <Input
            w="253.98px"
            {...field}
            id="added_date"
            type="date"
            size="lg"
          />
          <FormErrorMessage>{form.errors.added_date}</FormErrorMessage>
        </FC>
      )}
    </Field>
  </WrapItem>;
};

export const FormBottomButton = ({
  router,
  props,
  deleteBtn = false,
  onDelete,
}) => {
  return (
    <Wrap justify="center"  direction='row-reverse' >
      <WrapItem>
        <Button
          className="hvr-rectangle-out"
          leftIcon={<IoMdArrowRoundBack />}
          size="lg"
          variant="outline"
          colorScheme="blue"
          type="button"
          onClick={() => router.back()}
        >
          رجوع
        </Button>
      </WrapItem>
      <WrapItem>
        <Button
          className="hvr-rectangle-out"
          leftIcon={<VscClearAll />}
          size="lg"
          colorScheme="gray"
          variant="outline"
          type="button"
          onClick={props.handleReset}
          disabled={!props.dirty}
        >
          مسح
        </Button>
      </WrapItem>

      {deleteBtn && (
        <WrapItem>
          <Button
            className="hvr-rectangle-out"
            leftIcon={<AiFillDelete />}
            size="lg"
            colorScheme="red"
            variant="outline"
            type="button"
            onClick={onDelete}
            isLoading={props.isSubmitting}
          >
            حذف
          </Button>
        </WrapItem>
      )}
      <WrapItem>
        <Button
          className="hvr-rectangle-out"
          leftIcon={<IoSave />}
          size="lg"
          variant="outline"
          colorScheme="whatsapp"
          isLoading={props.isSubmitting}
          type="submit"
        >
          حفظ
        </Button>
      </WrapItem>
    </Wrap>
  );
};

export const EmployeesDropdownOptions = ({ emp }) => {
  return emp ? (
    emp.map((c) => (
      <option key={c._id} value={c._id}>
        {c.emp_name}
      </option>
    ))
  ) : (
    <option> No Employees Added Yet ...</option>
  );
};





export const BackBtn = ({ router }) => (
  <Button
    color="blue.500"
    colorScheme="gray"
    size="md"
    leftIcon={
      <ArrowBackIcon w="1.5rem" h="1.5rem" className="hvr hvr-backward" />
    }
    className="hvr-backward"
    onClick={() => router.back()}
    variant="solid"
    fontSize={["xs", "sm", "md", "lg"]}
  >
    Back
  </Button>
);
