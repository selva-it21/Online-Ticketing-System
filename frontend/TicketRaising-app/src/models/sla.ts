export class SLA{
    public slaId : string;
    public slaName : string;
    public priority : string;
    public responseTime : number;
    public resolutionHours : number;

    constructor(SLAId : string, SLAName : string, Priority : string, ResponseTime : number, ResolutionHours : number){
        this.slaId = SLAId;
        this.slaName = SLAName;
        this.priority = Priority;
        this.responseTime = ResponseTime;
        this.resolutionHours = ResolutionHours;
    }


}