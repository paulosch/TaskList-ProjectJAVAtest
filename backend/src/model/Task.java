package model;

public class Task {
	private int ID;
    private String title;
    private String status;
    private String description;
    private Long creatAt;
    private Long editAt;
    private Long doneAt;

    public Task() {
    }

    public Task(String title, String status, String description) {
        this.title = title;
        this.status = status;
        this.description = description;
    }

    public Task(int ID, String title, String status, String description, Long creatAt, Long editAt, Long doneAt) {
        this.ID = ID;
        this.title = title;
        this.status = status;
        this.description = description;
        this.creatAt = creatAt;
        this.editAt = editAt;
        this.doneAt = doneAt;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCreatAt() {
        return creatAt;
    }

    public void setCreatAt(Long creatAt) {
        this.creatAt = creatAt;
    }

    public Long getEditAt() {
        return editAt;
    }

    public void setEditAt(Long editAt) {
        this.editAt = editAt;
    }

    public Long getDoneAt() {
        return doneAt;
    }

    public void setDoneAt(Long doneAt) {
        this.doneAt = doneAt;
    }
}
