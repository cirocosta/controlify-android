package br.com.cirocosta.anncontroller;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends ActionBarActivity implements NsdInterface {

	private final static String TAG = "MainActivity";
	private NsdHelper mNsdHelper;
	private SocketIoHelper mSocketIo;
	MyDevice mDevice;
	SensorsHelper mSensorHelper;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		mDevice = new MyDevice();
		mNsdHelper = new NsdHelper(this, this);
		mSocketIo = new SocketIoHelper(mDevice);
		mNsdHelper.initializeNsd();
		mNsdHelper.discoverServices();

		mSensorHelper = mDevice.initializeSensors(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.action_settings:
			return true;
		default:
			return super.onOptionsItemSelected(item);
		}
	}

	/**
	 * Will be triggered when a service that we are expecting is resolved and we
	 * are ready to go.
	 */
	@Override
	public void onDesiredServiceResolved(String url) {
		Log.v(TAG, "DesiredService Resolved: Got the url -- " + url);
		mSocketIo.setSocketIo(url);
	}

	protected void onPause() {
		super.onPause();
		mSensorHelper.pauseSensors();
	}

	protected void onResume() {
		super.onResume();
		mSensorHelper.resumeSensors();
	}

}
