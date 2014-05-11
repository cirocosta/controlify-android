package br.com.cirocosta.anncontroller;

import org.json.JSONObject;

import android.content.Context;
import android.os.Build;

/**
 * Centraliza todo o estado do Device, i.e, valores dos sensores e botoes em um
 * dado timestamp, além de outras mais atemporais/gerais como o nome do device.
 * 
 * @author ciro
 * 
 */
public class MyDevice implements DeviceInterface{

	private String name;
	private SensorsHelper sh;

	private float aceX, aceY, aceZ;
	private boolean mF, mB, mL, mR;
	private boolean aA, aB, aC, aD;

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

	public SensorsHelper initializeSensors(Context context) {
		this.sh = new SensorsHelper(context, this);
		sh.setSensors();

		return this.sh;
	}

	@Override
	public String toString() {
		return this.name;
	}

	@Override
	public void onButtonsData(JSONObject data) {
	}

	@Override
	public void onSensorsData(JSONObject data) {
	}

}
