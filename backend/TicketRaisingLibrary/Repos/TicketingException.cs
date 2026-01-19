using System;

namespace TicketRaisingLibrary.Repos;

public class TicketingException : Exception
{
    public int ErrorNumber {get ; set ;}
    public TicketingException(string str , int errNo) : base(str)
    {
        ErrorNumber = errNo;
        
    }
}
