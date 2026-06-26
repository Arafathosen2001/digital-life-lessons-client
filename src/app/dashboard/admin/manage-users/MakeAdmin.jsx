"use client";

import {AlertDialog, Button} from "@heroui/react";
import { BiTrash } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
// import { FiDelete } from "react-icons/fi";

export function MakeAdmin({handleMakeAdmin,user}) {
  return (
    <AlertDialog>
      <Button className={'bg-success-soft text-success-soft-foreground'}> <FaUserShield /> Make Admin</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="success" />
              <AlertDialog.Heading>Are you sure This User Promot To Admin?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="success" className={'bg-success-soft text-success-soft-foreground'} onPress={() => handleMakeAdmin(user?._id)}>
                
                Make Admin
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}