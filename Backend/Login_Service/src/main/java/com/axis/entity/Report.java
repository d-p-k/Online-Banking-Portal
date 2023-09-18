package com.axis.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Report")
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reportid;
	private String tpid;
	private int userid;
	private String username;
	private LocalDate date;
	private String taskdescription;
	private String assignee;
	private String duration;
	private String remark;
	private String status;
	
	public Report() {
		super();
	}

	public Report(String tpid, int userid, String username, LocalDate date, String taskdescription, String assignee, String duration, String remark, String status) {
		super();
		this.tpid = tpid;
		this.userid = userid;
		this.username = username;
		this.date = date;
		this.taskdescription = taskdescription;
		this.assignee = assignee;
		this.duration = duration;
		this.remark = remark;
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getReportid() {
		return reportid;
	}

	public void setReportid(int reportid) {
		this.reportid = reportid;
	}

	public String getTpid() {
		return tpid;
	}

	public void setTpid(String tpid) {
		this.tpid = tpid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getTaskdescription() {
		return taskdescription;
	}

	public void setTaskdescription(String taskdescription) {
		this.taskdescription = taskdescription;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
