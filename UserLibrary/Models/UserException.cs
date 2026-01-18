using System;

namespace UserLibrary.Models;

public class UserException : Exception
{
    public UserException(string errMsg) : base(errMsg)
    {
        
    }
}
