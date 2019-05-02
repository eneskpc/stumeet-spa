export interface MessageForReceived {
    id: number;
    userId: number;
    groupId: number;
    messageContent: string;
    creationDate: Date;
    updatedDate: Date;
    isDeleted: boolean;
}
