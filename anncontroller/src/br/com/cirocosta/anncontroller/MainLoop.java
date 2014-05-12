package br.com.cirocosta.anncontroller;

import java.util.TimerTask;

import org.json.JSONException;

import android.util.Log;

public class MainLoop extends TimerTask{

	MyDevice mDevice;
	public static final String TAG = "MainLoop";
	
	public void setDevice(MyDevice device) {
		this.mDevice = device;
	}
	
	@Override
	public void run() {
		try {
			Log.d(TAG, this.mDevice.getDeviceData().toString());
		} catch (JSONException e) {
			Log.d(TAG, "no data");
		}
	}

}
