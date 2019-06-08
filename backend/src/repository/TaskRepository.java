package repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import model.Task;

public class TaskRepository {
	public TaskRepository() {
    }
    
    public int insert(Task task) throws SQLException {
        String sql = "INSERT INTO task(title, status, description, creatAt) VALUES (?,?,?,?)";
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});
        
        pst.setString(1, task.getTitle());
        pst.setString(2, task.getStatus());
        pst.setString(3, task.getDescription());
        pst.setTimestamp(4, new Timestamp(task.getCreatAt()));

        pst.executeUpdate();
        ResultSet rs = pst.getGeneratedKeys();

        if(rs.next())
            return rs.getInt((1));
        
        return 0;
    }
    
    public boolean update(int id, String col, String value) throws SQLException {
        String sql = "UPDATE task SET "
                + "?=? where ID=?";
        
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});
        
        pst.setString(1, col);
        pst.setString(2, value);
        pst.setInt(3, id);

        if(pst.executeUpdate()>0)
            return true;
            
        return false;
    }
    
    public boolean update(Task task) throws SQLException {
        String sql = "UPDATE task SET "
                + "title=?,status=?,description=?,editAt=?,doneAt=? "
                + "where ID=?";
        
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});
        
        pst.setString(1, task.getTitle());
        pst.setString(2, task.getStatus());
        pst.setString(3, task.getDescription());
        pst.setTimestamp(4, new Timestamp(task.getEditAt()));
        pst.setTimestamp(5, new Timestamp(task.getDoneAt()));
        pst.setInt(6, task.getID());

        if(pst.executeUpdate()>0)
            return true;
            
        return false;
    }

    public boolean delete(Task task) throws SQLException {
        String sql = "DELETE FROM task where ID=?";
        
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});

        pst.setInt(1, task.getID());

        if(pst.executeUpdate()>0)
            return true;
            
        return false;
    }
    
    public List<Task> list(String desc) throws SQLException {
        String like = desc.contains("*deleted") ? "LIKE" : "NOT LIKE";
        String sql = "SELECT * FROM task WHERE status " + like + " 'deleted'";
        
        if(!desc.contains("*"))
            sql += "AND (title LIKE '%" + desc + "%' OR description LIKE '%" + desc + "%')";
        
        sql += " ORDER BY creatAT DESC";
        
        List<Task> taskList = new ArrayList<>();
        
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});
        
        ResultSet res = pst.executeQuery();
        while(res.next())
        {
            Task task = new Task();
            task.setID(res.getInt("ID"));
            task.setTitle(res.getString("title"));
            task.setStatus(res.getString("status"));
            task.setDescription(res.getString("description"));
            task.setCreatAt(res.getTimestamp("creatAt").getTime());
            task.setEditAt(res.getTimestamp("editAt") == null ? null : res.getTimestamp("editAt").getTime());
            task.setDoneAt(res.getTimestamp("editAt") == null ? null : res.getTimestamp("editAt").getTime());

            taskList.add(task);
        }
            
        return taskList;
    }
    
    public Task getTask(Task task) throws SQLException {
        String sql = "SELECT * FROM task WHERE ID=?";
        Task item = null;
        
        PreparedStatement pst = MySqlConnection.getPreparedStatement(sql, new String[]{"ID"});
        
        pst.setInt(1, task.getID());
        ResultSet res = pst.executeQuery();

        if(res.next())
        {
            item = new Task();
            item.setID(res.getInt("ID"));
            item.setTitle(res.getString("title"));
            item.setStatus(res.getString("status"));
            item.setDescription(res.getString("description"));
            item.setCreatAt(res.getTimestamp("creatAt").getTime());
            item.setEditAt(res.getTimestamp("editAt").getTime());
            item.setDoneAt(res.getTimestamp("doneAt").getTime());
        }
        
        return item;
    }
}
