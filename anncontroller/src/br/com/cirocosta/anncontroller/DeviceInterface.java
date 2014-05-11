package br.com.cirocosta.anncontroller;

import org.json.JSONObject;

public interface DeviceInterface {
	public void onButtonsData(JSONObject buttonData);
	public void onSensorsData(JSONObject sensorsData);
}
