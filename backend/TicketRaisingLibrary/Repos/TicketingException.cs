using System;

namespace TicketRaisingLibrary.Repos;

public class TicketingException : Exception
{
    public TicketingException(string str) : base(str) {}
}
