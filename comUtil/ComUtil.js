import React from "react";
import { Field } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { VscClearAll } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";

import {
  FormControl as FC,
  Textarea,
  WrapItem,
} from "@chakra-ui/react";

import {
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Wrap,
} from "@chakra-ui/react";










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
            <FormLabel
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
              id={fieldName}
            >
              {labelName}
            </FormLabel>
            <Input
              textAlign="right"
              disabled={disabled}
              {...field}
              id={fieldName}
              placeholder={labelName}
              size={type === "datetime-local" ? "sm" : "lg"}
              type={type}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FC>
        )}
      </Field>
    </WrapItem>
  );
};

export const CustomFieldWithValue = ({
  fieldName,
  labelName,
  disabled = true,
  values,
  forSalary = false,
}) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FC isInvalid={meta.touched && meta.error}>
            <FormLabel
              id={fieldName}
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Input
              textAlign="right"
              disabled={disabled}
              {...field}
              id={fieldName}
              placeholder={labelName}
              value={values}
              color={
                !forSalary && (values == "OMR 0.000" ? "green.500" : "red.500")
              }
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
            <FormLabel
              id={fieldName}
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
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



export const FormBottomButton = ({
  router,
  props,
  deleteBtn = false,
  onDelete,
}) => {
  return (
    <Wrap justify="center" direction="row-reverse">
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

