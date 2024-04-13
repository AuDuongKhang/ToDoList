using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Models.DTOs
{
    public class AddTodoRequestDto
    {
        [Column("todo_name")]
        public string Name { get; set; }

    }
}
