declare interface hitResHitResultDto {
    ResultItems: resultItemDto[];
    RecordId: string;
    WorkerId: string;
    HitAppComments: string;
    ExternalAssignmentId: string;
    SubmitTime: Date;
}

declare interface resultItemDto{
    ResultItemData: string;
    TimeToCompleteItemInSeconds: number;
    Comment: string;
}

declare interface IRecord {
    Name: string;
    Value: string;
}