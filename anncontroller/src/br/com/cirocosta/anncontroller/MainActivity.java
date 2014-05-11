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

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		mNsdHelper = new NsdHelper(this, this);
		mSocketIo = new SocketIoHelper(new MyDevice());
		mNsdHelper.initializeNsd();
		mNsdHelper.discoverServices();
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

}
