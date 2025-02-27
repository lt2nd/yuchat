

// import {create} from "zustand";
// import { Server, ChannelType, Channel } from "@prisma/client";

// export type MadalType = "createServer"  | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

// interface ModalData {
//     server?: Server
//     channel?: Channel
//     channelType?: ChannelType;
//     apiUrl?: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     query?: Record<string, any>;
// }

// interface ModalStore {
//     type: MadalType | null;
//     data: ModalData; //data?: ModalData
//     isOpen: boolean;
//     onOpen: (type: MadalType, data?: ModalData) => void; //data?: ModalData
//     onClose: () => void;
// }

// export const useModal = create<ModalStore>((set) => ({
//     type: null,
//     data: {},
//     isOpen: false,
//     onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
//     onClose: () => set({ type: null, isOpen: false }),
// }))

import { Server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "invite";

interface ModalData {
    server?: Server
    // channel?: Channel
    // channelType?: ChannelType;
    // apiUrl?: string;
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // query?: Record<string, any>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData ) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));