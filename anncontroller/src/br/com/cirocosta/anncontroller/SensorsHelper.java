package br.com.cirocosta.anncontroller;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.widget.Button;

/**
 * Implementa a obtencao de dados dos Sensores do device.
 * @author ciro
 *
 */
public class SensorsHelper implements SensorEventListener {

	public static final String TAG = "SensorsHelper";
	private SensorManager senSensorManager;
	private Sensor senAccelerometer;
	private Context mContext;
	private Button btnTras, btnFrente;
	private long lastUpdate = 0;
	private DeviceInterface di;
	
	public SensorsHelper(Context context, DeviceInterface di) {
		this.mContext = context;
		this.di = di;
	}

	public void setSensors() {
		senSensorManager = (SensorManager) this.mContext
				.getSystemService(Context.SENSOR_SERVICE);
		senAccelerometer = senSensorManager
				.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
		senSensorManager.registerListener(this, senAccelerometer,
				SensorManager.SENSOR_DELAY_NORMAL);
	}

	public void pauseSensors() {
		senSensorManager.unregisterListener(this);
	}

	public void resumeSensors() {
		senSensorManager.registerListener(this, senAccelerometer,
				SensorManager.SENSOR_DELAY_NORMAL);
	}

	public void calibrateSensors() {

	}

	@Override
	public void onAccuracyChanged(Sensor sensor, int accuracy) {

	}

	@Override
	public void onSensorChanged(SensorEvent event) {
		Sensor mySensor = event.sensor;
		JSONObject sensorData = new JSONObject();
		float x, y, z;
		long curTime = System.currentTimeMillis();

		if ((curTime - lastUpdate) > 200) {

			lastUpdate = curTime;

			if (mySensor.getType() == Sensor.TYPE_ACCELEROMETER) {
				x = event.values[0];
				y = event.values[1];
				z = event.values[2];

				try {
					sensorData.put("aceX", x).put("aceY", y).put("aceZ", z);
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			di.onSensorsData(sensorData);
		}
	}
}
