export interface MessageForReceived {
    Id: number;
    UserId: number;
    GroupId: number;
    MessageContent: string;
    CreationDate: Date;
    UpdatedDate: Date;
    IsDeleted: boolean;
}
