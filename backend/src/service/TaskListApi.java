package service;

import java.io.StringReader;
import java.sql.SQLException;
import java.util.List;

import javax.json.Json;
import javax.json.JsonReader;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import model.Task;
import repository.TaskRepository;

@Path("task")
public class TaskListApi {
	//test
	@GET
	@Produces(MediaType.TEXT_HTML)
	@Path("test")
	public Response teste() {
		return Response.ok("<h1>Teste</h1>")
                .header("Access-Control-Allow-Origin", "*").build();
	}

	//get single task by id
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("get/{ID}")
    public Response getTask(@PathParam("ID") int ID) throws Exception{
        Task t = new Task();
        t.setID(ID);
        
        TaskRepository taskRepo = new TaskRepository();
        
        try {
            t = taskRepo.getTask(t);
        } catch (SQLException ex) {
            return Response.status(500).entity(ex.toString()).build();
        }
        
        Gson g = new Gson();
        
        return Response.ok(g.toJson(t))
                .header("Access-Control-Allow-Origin", "*").build();
    }
    
    //get list of tasks
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("list/{desc}")
    public Response listTaks(@PathParam("desc") String desc) throws Exception
    {
        List<Task> taskList = null;
        TaskRepository taskRepo = new TaskRepository();
        
        try {
            taskList = taskRepo.list(desc);
        } catch (SQLException ex) {
            return Response.status(500).entity(ex.toString()).build();
        }
        
        Gson g = new Gson();
        
        return Response.ok(g.toJson(taskList)).build();
    }
    
    //update task
    @Path("update")
    @PUT
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTask(String taskParams) throws Exception {
        Task task = new Task();

        try {
            JsonReader reader = Json.createReader(new StringReader(taskParams));
            javax.json.JsonObject jsonObject = reader.readObject();
            
            task.setID(jsonObject.getInt("ID"));
            task.setTitle(jsonObject.getString("title"));
            task.setStatus(jsonObject.getString("status"));
            task.setDescription(jsonObject.getString("description"));
            task.setEditAt(Long.parseLong(jsonObject.getString("editAt")));
            task.setDoneAt(Long.parseLong(jsonObject.getString("doneAt")));
        
            TaskRepository taskRepo = new TaskRepository(); 
            taskRepo.update(task);
        } catch (Exception ex) {
            return Response.status(500).entity(ex.toString()).build();
        }

        Gson g = new Gson();
        return Response.ok(g.toJson(task))
                .build();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("insert")
    public Response insertTask(String taskParams) throws Exception {
        
        Task task = new Task();

        try {
            String[] aTask = taskParams.split(",");
            
            task.setCreatAt(Long.parseLong(aTask[0]));
            task.setTitle(aTask[1]);
            task.setStatus("pending");
            task.setDescription(aTask[2]);
            
            TaskRepository taskRepo = new TaskRepository();
            int taskId = taskRepo.insert(task);
            
            if(taskId > 0){
                task.setID(taskId);
                task.setCreatAt(new Long(System.currentTimeMillis()));
                
                Gson g = new Gson();
                return Response.ok(g.toJson(task))
                        .build();
            }
            
        } catch (SQLException ex) {
            return Response.status(500).entity(ex.toString()).build();
        }

        return Response.status(500).build();
    }
}
