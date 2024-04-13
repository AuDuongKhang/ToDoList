using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Models;
using TodoList.Models.DTOs;

namespace TodoList.Controllers
{
    //https://localhost:portnumber/api/createitem
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly TodoContext dbContext;
        public ToDoController(TodoContext dbContext)
        {
            this.dbContext = dbContext;   
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var getAllTodoList = await dbContext.Todos.ToListAsync();
            var totalTodoList = getAllTodoList.Count();
            int totalActiveTodo = 0;
            foreach (var item in getAllTodoList)
            {
                if (item.Status == "check")
                {
                    totalActiveTodo++;
                }
            }

            return Ok(new { todolist = getAllTodoList, total = totalTodoList, activeTodo = totalActiveTodo });

        }

        private bool TodoExists(int id)
        {
            return dbContext.Todos.Any(td => td.Id == id);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, Todo todoContext)
        {
            // dbContext.Todos.Update(todoContext);
            // await dbContext.SaveChangesAsync();
            //return Ok(todoContext);
            if (id != todoContext.Id)
            {
                return BadRequest();
            }
            dbContext.Entry(todoContext).State = EntityState.Modified;
            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var findIndex = await dbContext.Todos.FindAsync(id);
            if (findIndex == null)
            {
                return NotFound();
            }
            dbContext.Todos.Remove(findIndex);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var todo = dbContext.Todos.Find(id);
            //var todo = db.Context.Todos.FirstOrDefault(x =>x.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            //Map/Convert Todo Domain Model to Todo DTOs
            var todoDto = new TodoDto
            {
                Id = todo.Id,
                Name = todo.Name,
                Status = todo.Status
            };

            //Return DTO back to client
            return Ok(todoDto);
        }
        //POST to create new item
        //POST: https://localhost:portnumber/api/ToDo
        [HttpPost]
        public IActionResult Create([FromBody] AddTodoRequestDto addTodoRequestDto)
        {
            //Map or Convert DTO to Domain Model
            var todoDomainModel = new Todo
            {
                Name = addTodoRequestDto.Name
            };

            //Use Domain Model to create work
            dbContext.Todos.Add(todoDomainModel);
            dbContext.SaveChanges();

            //Map domain model back to DTO
            var todoDto = new Todo
            {
                Id = todoDomainModel.Id,
                Name = todoDomainModel.Name,
                Status = todoDomainModel.Status
            };
            return CreatedAtAction(nameof(GetById), new { id = todoDomainModel.Id }, todoDomainModel);
        }

        //DELETE to delete multiple item
        //DELETE: https://localhost:portnumber/api/ToDo
        [HttpDelete]
        public IActionResult DeleteMultipleCheck()
        {
            foreach (var todo in dbContext.Todos.ToList())
            {
                if (todo.Status.ToString() == "check")
                {
                    var todo_temp = dbContext.Todos.Find(todo.Id);
                    if (todo_temp != null)
                    {
                        dbContext.Todos.Remove(todo_temp);
                        dbContext.SaveChanges();
                    }
                }
            }
            return Ok();
        }
    }
}
