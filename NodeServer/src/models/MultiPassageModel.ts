    export class MultiPassageModel implements IMultiPassage {
    public HitItemId: any;

    // functions
    public UpdateRating: any;
    public UpdateComment: any;

    // public members of hitapp that do not change
    public id: string = '';
    public query: string = '';
    public passageA: string = '';
    public passageB: string = '';

    // private internals
    private comment: string = '';
    private rating: number;
    private index: number = 0;
    private time: any;

    constructor(index: number = 0) {
        this.index = index;
        this.loadHitData();
    }

    public get Index(): number {
        return this.index;
    }

    public set Index(value: number) {
        this.index = value;
        this.loadHitData();
    }

    public get Comment(): string {
        return this.comment;
    }

    public set Comment(value: string) {
        if (true) {
            this.comment = value;
            window.HitData[this.index].Comment = this.comment;
        }
    }

    public get Rating(): number {
        return this.rating;
    }

    public set Rating(value: number) {
        this.rating = value;
        window.HitData[this.index].Rating = this.rating;
    }

    public get Time(): any {

        if (this.time == null) {
            return 0;
        }
        return this.time;
    }

    public set Time(value: any) {
        if (value) {
            this.time = value;
            window.HitData[this.index].Time = this.time;
        }
    }

    // load the data
    private loadHitData() {
        if (!window.HitData || !window.HitData[0]) {
            return;
        }
        this.id = window.HitData[this.index].id;
        this.query = window.HitData[this.index].query;
        this.passageA = window.HitData[this.index].passageA;
        this.passageB = window.HitData[this.index].passageB;

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
