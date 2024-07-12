import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import  { useRef } from "react";


interface IProps {
  isOpen: boolean;
  onCLose: () => void;
  onOk?: ()=> void
}
export default function ALertConfirm({ isOpen, onCLose,onOk }: IProps) {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isCentered
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCLose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Logout
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure to log out?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCLose}>
              Cancel
            </Button>
            <Button onClick={onOk} colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
