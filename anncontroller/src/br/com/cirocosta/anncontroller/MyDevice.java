package br.com.cirocosta.anncontroller;

import android.os.Build;

public class MyDevice {

	private String name;
	
	public MyDevice() {
		this.name = getDeviceName(); 
	}
	
	public MyDevice(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDeviceName() {
		String manufacturer = Build.MANUFACTURER.toUpperCase();
		String model = Build.MODEL.toUpperCase();
		if (model.startsWith(manufacturer)) {
			return model;
		} else {
			return manufacturer + " " + model;
		}
	}

	@Override
	public String toString() {
		return this.name;
	}
	
	
	
}
