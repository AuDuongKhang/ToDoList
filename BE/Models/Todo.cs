using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Models
{
    public class Todo
    {
        [Column("todo_id")]
        public int Id { get; set; }
        [Column("todo_name")]
        public string Name {  get; set; }
        [Column("todo_status")]
        public string Status {  get; set; }
        

        public Todo()
        {
            Name = string.Empty;
            Status = "uncheck";
        }
    }
}
