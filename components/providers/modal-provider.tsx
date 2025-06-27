"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MemebersModal from "../modals/members-modal";
import CreateChannelModal from "../modals/create-channel-modal";
import LeaveServerModal from "../modals/leave-channel-modal";
import DeleteServerModal from "../modals/delete-server-modal";

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <CreateChannelModal />
      <InviteModal />
      <EditServerModal />
      <MemebersModal />
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  );
};
