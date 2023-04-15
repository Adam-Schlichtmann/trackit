import { AlertDialog, Button, IButtonProps } from "native-base";
import { useRef } from "react";

export type Button = {
  title: string;
} & IButtonProps;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  buttons: Button[];
  message: string;
};

const ConfirmationModal = ({ isOpen, onClose, buttons, message }: Props) => {
  const ref = useRef(null);
  return (
    <AlertDialog leastDestructiveRef={ref} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Delete Field</AlertDialog.Header>
        <AlertDialog.Body>{message}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            {buttons.map(({ title, ...rest }) => (
              <Button key={title} {...rest}>
                {title}
              </Button>
            ))}
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ConfirmationModal;
