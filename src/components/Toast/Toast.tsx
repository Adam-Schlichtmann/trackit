import {
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Alert,
  Text,
  IToastProps,
  IAlertProps,
} from "native-base";

type Props = Pick<IToastProps, "description" | "title" | "id"> &
  Pick<IAlertProps, "status" | "variant"> & {
    onClose?: (id: Pick<IToastProps, "id">) => void;
  };

const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  onClose,
  ...rest
}: Props) => (
  <Alert
    maxWidth='100%'
    alignSelf='center'
    flexDirection='row'
    status={status ? status : "info"}
    variant={variant}
    {...rest}
  >
    <VStack flexShrink={1}>
      <HStack flexShrink={1} alignItems='center' justifyContent='space-between'>
        <HStack space={2} flexShrink={1} alignItems='center'>
          <Alert.Icon />
          <Text
            fontSize='md'
            fontWeight='medium'
            flexShrink={1}
            color={
              variant === "solid"
                ? "lightText"
                : variant !== "outline"
                ? "darkText"
                : null
            }
          >
            {title}
          </Text>
        </HStack>
        {!!onClose ? (
          <IconButton
            variant='unstyled'
            icon={<CloseIcon size='3' />}
            _icon={{
              color: variant === "solid" ? "lightText" : "darkText",
            }}
            onPress={() => onClose(id)}
          />
        ) : null}
      </HStack>
      <Text
        px='6'
        color={
          variant === "solid"
            ? "lightText"
            : variant !== "outline"
            ? "darkText"
            : null
        }
      >
        {description}
      </Text>
    </VStack>
  </Alert>
);

export default ToastAlert;
