using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserLibrary.Models;

[Table("LoginUser")]
public class LoginUser
{
    [Key]
    [Column(TypeName = "VARCHAR(30)")]
    public string Username { get; set; }
    [Required]
    [Column(TypeName = "VARCHAR(15)")]
    public string UserPassword { get; set; }
    [Required]
    [Column(TypeName = "VARCHAR(10)")]
    public string UserRole { get; set; }
}
