export class MultiPassageModel implements IMultiPassage {
    // functions
    public UpdateRating: any;
    public UpdateComment: any;

    // public members of hitapp that do not change
    public Id: number = 0;
    public Query: string = '';
    public PassageA: string = '';
    public PassageB: string = '';

    // private internals
    private comment: string = '';
    private rating: number;
    private index: number = 0;
    private time: any;

    constructor(index: number = 0) {
        this.index = index;
        this.loadHitData();
    }

    // items that need data saving
    get Index(): number {
        return this.index;
    }

    set Index(value: number) {
        this.index = value;
        this.loadHitData();
    }

    get Comment(): string {
        return this.comment;
    }

    set Comment(value: string) {
        if (value) {
            this.comment = value;
            window.HitData[this.index].Comment = this.comment;
            const saveCommentLocation: HTMLInputElement = document.getElementById(`comment${this.Index}`) as HTMLInputElement;
            saveCommentLocation.value = this.comment;
        }
    }

    get Rating(): number {
        return this.rating;
    }

    set Rating(value: number) {
            this.rating = value;
            window.HitData[this.index].Rating = this.rating;
            const saveRatingLocation: HTMLInputElement = document.getElementById(`rating${this.Index}`) as HTMLInputElement;
            saveRatingLocation.value = this.rating.toString();
    }

    get Time(): any {
        return this.time;
    }

    set Time(value: any) {
        if (value) {

            this.time = value;
            window.HitData[this.index].Time = this.time;
            const saveTimeLocation: HTMLInputElement = document.getElementById(`time${this.Index}`) as HTMLInputElement;
            saveTimeLocation.value = this.time.toString();
        }
    }

    // load the data
    private loadHitData() {
        this.Id = window.HitData[this.index].Id;
        this.Query = window.HitData[this.index].Query;
        this.PassageA = window.HitData[this.index].PassageA;
        this.PassageB = window.HitData[this.index].PassageB;

        if (window.HitData[this.index].Rating) {
            this.Rating = window.HitData[this.index].Rating;
        }

        // tslint:disable-next-line:prefer-conditional-expression
        if (window.HitData[this.index].Comment) {
            this.Comment = window.HitData[this.index].Comment;
        } else {
            this.Comment = '';
        }
    }
}
