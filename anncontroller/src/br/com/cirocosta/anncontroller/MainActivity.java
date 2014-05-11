package br.com.cirocosta.anncontroller;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;

public class MainActivity extends ActionBarActivity implements NsdInterface {

	private final static String TAG = "MainActivity";
	private NsdHelper mNsdHelper;
	private SocketIoHelper mSocketIo;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		mNsdHelper = new NsdHelper(this, this);
		mSocketIo = new SocketIoHelper();
		mNsdHelper.initializeNsd();
		
		setUiEvents();
	}
	
	private void setUiEvents() {
		
		// button
		
		(findViewById(R.id.btnTrigger))
				.setOnClickListener(new OnClickListener() {

					@Override
					public void onClick(View v) {
						mNsdHelper.discoverServices();
					}
				});
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


	@Override
	public void onDesiredServiceResolved(String url) {
		Log.v(TAG, url);
		mSocketIo.setSocketIo(url);
	}
	
}
