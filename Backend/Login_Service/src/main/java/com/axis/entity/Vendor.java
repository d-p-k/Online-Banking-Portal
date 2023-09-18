package com.axis.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Vendor")
public class Vendor {
	
	@Id
	private String tpid;
	private int userid;
	private String process;
	private String joblocation;
	
	public Vendor() {
		super();
	}

	public Vendor(String tpid, int userid, String process, String joblocation) {
		super();
		this.tpid = tpid;
		this.userid = userid;
		this.process = process;
		this.joblocation = joblocation;
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

	public String getProcess() {
		return process;
	}

	public void setProcess(String process) {
		this.process = process;
	}

	public String getJoblocation() {
		return joblocation;
	}

	public void setJoblocation(String joblocation) {
		this.joblocation = joblocation;
	}

	@Override
	public String toString() {
		return "Vendor [tpid=" + tpid + ", userid=" + userid + ", process=" + process + ", joblocation=" + joblocation + "]";
	}

}
