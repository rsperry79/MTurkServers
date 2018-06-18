declare interface IMultiPassageHitItem extends IMultiPassageDtoHitItem {
    HitItemId: string;
    Rating: number;
    Comment: string;
    Time: number;

}

declare interface IMultiPassageDtoHitItem {
    id: string;
    query: string;
    passageA: string;
    passageB: string;
}

declare interface IMultiPassage extends IMultiPassageHitItem {
    Index: number;
    UpdateRating: any;
    UpdateComment: any;
}

declare interface IMultiPassageState {
    Request: IMturkRequest;
    currentIndex: number;
    showWork: boolean;
    showButton: boolean;
    showSubmit: boolean;
    model: IMultiPassage;
    percentage: number;
    time: Date;
    width: string;
}

declare interface  IMultiPassageDto{
	hitItemId: any;
	hitItemData: string;
}




