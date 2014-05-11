package br.com.cirocosta.anncontroller;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

import java.net.MalformedURLException;

import org.json.JSONObject;

import android.util.Log;

/**
 * Deals with SocketIO connections with the server.
 * @author ciro
 *
 */
public class SocketIoHelper {
	
	private SocketIO mSocket;
	private String currentUrl = "";
	
	public SocketIoHelper() {
		
	}
	
	public void setSocketIo(String url) {
		
		currentUrl = url;
		
		try {
			mSocket = new SocketIO(currentUrl);
			mSocket.connect(new IOCallback() {

				@Override
				public void on(String event, IOAcknowledge ack, Object... args) {
					Log.v("SOCKETIO", event + " : " + args.toString());
				}

				@Override
				public void onConnect() {
					Log.v("SOCKETIO", "Connection Event Fired");
					mSocket.send("I'M HERE BITCH!");
				}

				@Override
				public void onDisconnect() {
					Log.v("SOCKETIO", "Disconnected");
				}

				@Override
				public void onError(SocketIOException socketIOException) {
					Log.v("SOCKETIO",
							"Error :( " + socketIOException.toString());
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

		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
	}
}
