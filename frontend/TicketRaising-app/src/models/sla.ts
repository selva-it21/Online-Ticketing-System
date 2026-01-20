export class SLA{
    public SLAId : string;
    public SLAName : string;
    public Priority : string;
    public ResponseTime : number;
    public ResolutionHours : number;

    constructor(SLAId : string, SLAName : string, Priority : string, ResponseTime : number, ResolutionHours : number){
        this.SLAId = SLAId;
        this.SLAName = SLAName;
        this.Priority = Priority;
        this.ResponseTime = ResponseTime;
        this.ResolutionHours = ResolutionHours;
    }


}