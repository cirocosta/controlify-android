package br.com.cirocosta.anncontroller;

import io.socket.SocketIO;

import java.util.TimerTask;

import org.json.JSONException;

import android.util.Log;

public class MainLoop extends TimerTask {

	private MyDevice mDevice;
	private SocketIoHelper mSocketConnection;

	public static final String TAG = "MainLoop";

	public void setDevice(MyDevice device) {
		this.mDevice = device;
	}

	public void setSocketConnection(SocketIoHelper socketConnection) {
		this.mSocketConnection = socketConnection;
	}

	@Override
	public void run() {
		try {
			this.mSocketConnection.sendData(Constants.EV_ALL_DATA,
					this.mDevice.getDeviceData());
		} catch (JSONException e) {
			Log.d(TAG, "Error w/ json");
		}
	}

}
