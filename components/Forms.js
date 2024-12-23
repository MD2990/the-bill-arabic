import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	GridItem,
	Input,
	SimpleGrid,
	Box,
	Separator,
	Stack,
	Textarea,
	Select,
	Checkbox,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineDelete, AiOutlineRest, AiOutlineSave } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { FcPrint } from "react-icons/fc";
import { Field } from "@/components/ui/field";

const fontSize = ["sm", "md", "lg", "xl"];
const fontWeight = "500";

const CustomField = ({
	name,
	label,
	control,
	errors,
	type = "text",
	isDisabled,
	isReadOnly,
}) => (
	<Field
		invalid={!!errors[name]}
		errorText={errors[name]?.message || ""} // Extract message from error object
		label={label}
		htmlFor={name}
		fontSize={fontSize}
		fontWeight={fontWeight}
		mb="0.5"
		mt="1"
	>
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Input
					w={"full"}
					fontSize={["sm", "md"]}
					size={["sm", "md"]}
					id={name}
					type={type}
					step={type === "number" ? "0.01" : ""}
					isDisabled={isDisabled}
					isReadOnly={isReadOnly}
					autoComplete={type === "password" ? "current-password" : "on"}
					isInvalid={!!errors[name]}
					{...field}
					placeholder={label}
				/>
			)}
		/>
	</Field>
);

const CustomTextArea = ({
	name,
	errors,
	label,
	control,
	textAreaColSpan = [1, 2, 3, 4],
	textAreaMinH = [],
}) => (
	<GridItem p="1" mt="1" colSpan={textAreaColSpan}>
		<Field
			invalid={!!errors[name]}
			errorText={errors[name]?.message || ""}
			mb="0.5"
			htmlFor={name}
			fontSize={fontSize}
			fontWeight={fontWeight}
			label={label}
		>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Textarea
						minH={textAreaMinH}
						fontSize={["sm", "md"]}
						id={name}
						isInvalid={!!errors[name]}
						{...field}
						placeholder={label}
					/>
				)}
			/>
		</Field>
	</GridItem>
);

const CustomDropdown = ({ name, label, control, errors, options }) => (
	<Field
		invalid={errors[name]}
		label={label}
		htmlFor={name}
		errorText={errors[name]}
		fontSize={fontSize}
		fontWeight={fontWeight}
		mb="0.5"
		mt="1"
	>
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Select {...field} id={name} iconSize="0px">
					{options?.map((option, index) => (
						<option
							style={{
								textAlign: "start",
							}}
							key={index}
							value={option.value || option}
						>
							{option.name || option}
						</option>
					))}
				</Select>
			)}
		/>
	</Field>
);

const CheckboxField = ({
	name,
	label,
	control,
	errors,
	isDisabled,
	isReadOnly,
}) => (
	<GridItem p="1" mt="1" colSpan={[1]}>
		<Field
			invalid={errors[name]}
			errorText={errors[name]}
			htmlFor={name}
			mb="0"
			fontSize={["sm", "md", "lg", "xl"]}
			fontWeight={fontWeight}
			label={label}
		>
			<Stack textAlign={"start"} direction={"row"} alignItems={"center"}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Checkbox
							mb="0"
							{...field}
							id={name}
							placeholder={label}
							size={["sm", "md", "lg"]}
							fontSize={fontSize}
							isChecked={field.value || false}
							isDisabled={isDisabled}
							isReadOnly={isReadOnly}
						/>
					)}
				/>
			</Stack>
		</Field>
	</GridItem>
);

const CustomRadioField = ({
	name,
	label,
	control,
	options,
	radioFieldColSpan = [1, 2, 3, 4],
}) => (
	<GridItem p="1" mt="1" colSpan={radioFieldColSpan}>
		<Field
			label={label}
			htmlFor={name}
			fontSize={fontSize}
			fontWeight={fontWeight}
			mb="0.5"
			mt="1"
		>
			<Stack textAlign={"start"}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<RadioGroup {...field}>
							{options.map((option, index) => (
								<Radio
									size={["sm", "md", "lg"]}
									px={index !== 0 ? [2, 4, 8, 10] : 1}
									key={option.value}
									value={option.value}
								>
									{option.label}
								</Radio>
							))}
						</RadioGroup>
					)}
				/>
			</Stack>
		</Field>
	</GridItem>
);

const ReusableForm = ({
	initialValues,
	onSubmit,
	validationSchema,
	fields,
	children,
	onDelete,
	print,
	colSpan = [1, 2, 3, 4],
	textAreaColSpan = [1, 2, 3, 4],
	radioFieldColSpan = [1, 2, 3, 4],
	textAreaMinH,
}) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(validationSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SimpleGrid
				w="full"
				boxShadow={"md"}
				rounded={"md"}
				p={[1, 2, 3, 4]}
				px={[2, 4, 6]}
				columns={colSpan}
				rowGap={[1, 2, 3, 4]}
				columnGap={[1, 2, 3, 8]}
				shadow={"md"}
				verticalAlign={"center"}
				alignContent={"center"}
				justifyContent={"center"}
				justify="center"
				align="center"
			>
				{fields.map((field) =>
					field.type === "radio" ? (
						<CustomRadioField
							key={field.name}
							name={field.name}
							label={field.label}
							control={control}
							options={field.options}
							radioFieldColSpan={radioFieldColSpan}
						/>
					) : field.type === "textArea" ? (
						<CustomTextArea
							key={field.name}
							name={field.name}
							label={field.label}
							control={control}
							textAreaColSpan={textAreaColSpan}
							errors={errors}
							textAreaMinH={textAreaMinH}
						/>
					) : field.type === "dropdown" ? (
						<CustomDropdown
							key={field.name}
							name={field.name}
							label={field.label}
							control={control}
							errors={errors}
							options={field.options}
						/>
					) : field.type === "checkbox" ? (
						<CheckboxField
							key={field.name}
							name={field.name}
							label={field.label}
							control={control}
							errors={errors}
						/>
					) : (
						<Box key={field.name}>
							<CustomField
								name={field.name}
								label={field.label}
								control={control}
								errors={errors}
								type={field.type}
								isDisabled={field.isDisabled}
								isReadOnly={field.isReadOnly}
							/>
						</Box>
					)
				)}

				<GridItem p="2" w="full" m="auto" colSpan={colSpan}>
					<Separator borderColor={"gray.400"} p="1" />
				</GridItem>

				<GridItem p="2" w="full" m="auto" colSpan={colSpan}>
					<Stack
						spacing={[2, 3, 4]}
						justify={"center"}
						align={"center"}
						direction={{ base: "column", sm: "row" }}
						w="full"
					>
						<Button
							leftIcon={<AiOutlineSave />}
							w="full"
							size={["sm", "md", "lg"]}
							colorScheme="green"
							isLoading={isSubmitting}
							type="submit"
						>
							{"save"}
						</Button>
						<Button
							leftIcon={<AiOutlineRest />}
							w="full"
							size={["sm", "md", "lg"]}
							colorScheme="gray"
							isLoading={isSubmitting}
							onClick={() => {
								// Reset the form
								reset(initialValues);
							}}
						>
							Reset
						</Button>
						{children}

						{onDelete && (
							<Button
								leftIcon={<AiOutlineDelete />}
								size={["sm", "md", "lg"]}
								w="full"
								isLoading={isSubmitting}
								colorScheme="red"
								onClick={onDelete}
							>
								{"delete"}
							</Button>
						)}

						{print && (
							<Button
								w="full"
								size={["sm", "md", "lg"]}
								leftIcon={<FcPrint />}
								colorScheme="green"
								variant={"outline"}
								isLoading={isPending || isSubmitting}
								onClick={() => {
									startTransition(() => {
										print();
									});
								}}
							>
								{"Print"}
							</Button>
						)}

						<Button
							leftIcon={<TiArrowBack />}
							alignContent={"normal"}
							alignItems={"center"}
							alignSelf={"center"}
							size={["sm", "md", "lg"]}
							w="full"
							colorScheme="gray"
							isLoading={isSubmitting || isPending}
							onClick={() => {
								// back to the previous page

								startTransition(() => {
									router.back();
								});
							}}
						>
							{"Back"}
						</Button>
					</Stack>
				</GridItem>
			</SimpleGrid>
		</form>
	);
};

export default ReusableForm;
