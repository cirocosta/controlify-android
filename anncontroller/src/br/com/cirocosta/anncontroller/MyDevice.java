package br.com.cirocosta.anncontroller;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.Build;
import android.util.Log;

/**
 * Centraliza todo o estado do Device, i.e, valores dos sensores e botoes em um
 * dado timestamp, além de outras mais atemporais/gerais como o nome do device.
 * 
 * @author ciro
 * 
 */
public class MyDevice implements DeviceInterface {

	public static final String TAG = "MyDevice";

	private String name;
	private SensorsHelper sh;

	private JSONObject currSensorData;
	private JSONObject currButtonData;

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

	public JSONObject getDeviceData() throws JSONException {
		return new JSONObject().put("sensors", this.currSensorData).put(
				"buttons", this.currButtonData);
	}

	@Override
	public String toString() {
		return this.name;
	}

	@Override
	public void onButtonsData(JSONObject data) {
		// Log.v(TAG, "onButtonsData: " + data.toString());
		this.currButtonData = data;
	}

	@Override
	public void onSensorsData(JSONObject data) {
		// Log.v(TAG, "onSensorsData: " + data.toString());
		this.currSensorData = data;
	}

}
