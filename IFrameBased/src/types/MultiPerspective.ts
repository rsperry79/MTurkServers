interface IMultiPassageHitItem {
    Id: number;
    Query: string;
    PassageA: string;
    PassageB: string;
    Rating: number;
    Comment: string;
    Time: number;
}

interface IMultiPassage extends IMultiPassageHitItem {
    Index: any;
    UpdateRating: any;
    UpdateComment: any;
}

interface IMultiPassageState {
    currentIndex: number;
    showWork: boolean;
    showButton: boolean;
    showComments: boolean;
    model: IMultiPassage;
    percentage: number;
    time: Date;
    width: string;
}
