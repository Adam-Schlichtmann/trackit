import { AlertDialog, Button, IButtonProps } from "native-base";
import { useRef } from "react";

export type Button = {
  title: string;
} & IButtonProps;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  buttons: Button[];
};

const ConfirmationModal = ({ isOpen, onClose, buttons }: Props) => {
  const ref = useRef(null);
  return (
    <AlertDialog leastDestructiveRef={ref} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Delete Field</AlertDialog.Header>
        <AlertDialog.Body>
          Are you sure you want to remove this field
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            {buttons.map(({ title, ...rest }) => (
              <Button {...rest}>{title}</Button>
            ))}
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ConfirmationModal;
