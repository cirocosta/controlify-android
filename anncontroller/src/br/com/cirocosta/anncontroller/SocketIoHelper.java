package br.com.cirocosta.anncontroller;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

import java.net.MalformedURLException;

import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

/**
 * Deals with SocketIO connections with the server.
 * 
 * @author ciro
 * 
 */
public class SocketIoHelper {

	private SocketIO mSocket;
	private String currentUrl = "";
	private MyDevice device;
	private boolean connected = false;

	public static final String TAG = "SocketIoHelper";
	
	public SocketIoHelper(MyDevice device) {
		this.device = device;
	}
	
	public void sendData(String event, JSONObject data) {
		if (connected) {
			try {
				mSocket.emit(event, data);				
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			Log.d(TAG, "SocketIO not connected yet");
		}
	}

	public void setSocketIo(String url) {

		currentUrl = url;

		try {
			mSocket = new SocketIO(currentUrl);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		mSocket.connect(new IOCallback() {

			@Override
			public void onConnect() {
				connected = true;
				Log.d("SOCKETIO",
						"Connection Event Fired. Sending " + device.toString());
				try {
					mSocket.emit(Constants.EV_CONNECT,
							new JSONObject().put("name", device.getName()));
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
			
			@Override
			public void onDisconnect() {
				connected = false;
				Log.v("SOCKETIO", "Disconnected");
			}

			@Override
			public void on(String event, IOAcknowledge ack, Object... args) {
				Log.v("SOCKETIO", event + " : " + args.toString());
			}

			@Override
			public void onError(SocketIOException socketIOException) {
				Log.v("SOCKETIO", "Error :( " + socketIOException.toString());
			}

			@Override
			public void onMessage(String data, IOAcknowledge ack) {
				Log.v("SOCKETIO", "Message: " + data);

			}

			@Override
			public void onMessage(JSONObject data, IOAcknowledge ack) {
				Log.v("SOCKETIO", "Message w/ json: " + data.toString());
			}
		});

	}
}
