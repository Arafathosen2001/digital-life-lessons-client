"use client";

import {AlertDialog, Button} from "@heroui/react";
import { BiTrash } from "react-icons/bi";
// import { FiDelete } from "react-icons/fi";

export function DeletButton({handleDeleteUser}) {
  return (
    <AlertDialog>
      <Button variant="danger"> <BiTrash></BiTrash> Delete User</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Are you sure This User Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onPress={() => handleDeleteUser()}>
                
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}