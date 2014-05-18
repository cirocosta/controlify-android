package br.com.cirocosta.anncontroller;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.util.Log;

public class NsdHelper {

	private NsdManager mNsdManager;
	private NsdManager.ResolveListener mResolveListener;
	private NsdManager.DiscoveryListener mDiscoveryListener;
	private NsdManager.RegistrationListener mRegistrationListener;
	private NsdInterface nsdInterface;
	private NsdServiceInfo mService;

	public static final String SERVICE_TYPE = "_http._tcp.";
	public static final String TAG = "NsdHelper";
	public static final String mServiceName = "controlify";

	public String currentServiceUrl = "";

	public NsdHelper(Context context, NsdInterface ni) {
		mNsdManager = (NsdManager) context
				.getSystemService(Context.NSD_SERVICE);
		nsdInterface = ni;
	}

	public void initializeNsd() {
		initializeResolveListener();
		initializeDiscoveryListener();
		initializeRegistrationListener();
	}

	
	public void initializeDiscoveryListener() {
		mDiscoveryListener = new NsdManager.DiscoveryListener() {

			@Override
			public void onDiscoveryStarted(String regType) {
				Log.d(TAG, "Service discovery started");
			}

			@Override
			public void onServiceFound(NsdServiceInfo service) {
				Log.d(TAG, "Service discovery success" + service);
				Log.v(TAG, "searching for " + mServiceName + ". Found: "
						+ service.getServiceName());
				if (!service.getServiceType().equals(SERVICE_TYPE)) {
					Log.d(TAG,
							"Unknown Service Type: " + service.getServiceType());
				} else if (service.getServiceName().contains(mServiceName)) {
					mNsdManager.resolveService(service, mResolveListener);
				}

			}

			@Override
			public void onServiceLost(NsdServiceInfo service) {
				Log.e(TAG, "service lost" + service);
				if (mService == service) {
					mService = null;
				}
			}

			@Override
			public void onDiscoveryStopped(String serviceType) {
				Log.i(TAG, "Discovery stopped: " + serviceType);
			}

			@Override
			public void onStartDiscoveryFailed(String serviceType, int errorCode) {
				Log.e(TAG, "Discovery failed: Error code:" + errorCode);
				mNsdManager.stopServiceDiscovery(this);
			}

			@Override
			public void onStopDiscoveryFailed(String serviceType, int errorCode) {
				Log.e(TAG, "Discovery failed: Error code:" + errorCode);
				mNsdManager.stopServiceDiscovery(this);
			}
		};
	}

	public void initializeResolveListener() {
		mResolveListener = new NsdManager.ResolveListener() {

			@Override
			public void onResolveFailed(NsdServiceInfo serviceInfo,
					int errorCode) {
				Log.e(TAG, "Resolve failed" + errorCode);
			}

			@Override
			public void onServiceResolved(NsdServiceInfo serviceInfo) {
				Log.e(TAG, "Resolve Succeeded. " + serviceInfo);

				try {
					String urlGotten = serviceInfo.getHost().toString() + ":"
							+ Integer.toString(serviceInfo.getPort());
					urlGotten = "http://" + urlGotten.replace("/", "");

					Log.v(TAG, urlGotten);

					if (!urlGotten.equals(currentServiceUrl)) {
						currentServiceUrl = urlGotten;
						nsdInterface
								.onDesiredServiceResolved(currentServiceUrl);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

				mService = serviceInfo;
			}
		};
	}

	public void initializeRegistrationListener() {
		mRegistrationListener = new NsdManager.RegistrationListener() {

			@Override
			public void onServiceRegistered(NsdServiceInfo NsdServiceInfo) {

			}

			@Override
			public void onRegistrationFailed(NsdServiceInfo arg0, int errorCode) {
				Log.v(TAG, "ERRRORR " + Integer.toString(errorCode));
			}

			@Override
			public void onServiceUnregistered(NsdServiceInfo arg0) {
			}

			@Override
			public void onUnregistrationFailed(NsdServiceInfo serviceInfo,
					int errorCode) {
			}

		};
	}

	public void registerService(int port) {
		NsdServiceInfo serviceInfo = new NsdServiceInfo();
		serviceInfo.setPort(port);
		serviceInfo.setServiceName(mServiceName);
		serviceInfo.setServiceType(SERVICE_TYPE);

		mNsdManager.registerService(serviceInfo, NsdManager.PROTOCOL_DNS_SD,
				mRegistrationListener);

	}

	public void discoverServices() {
		mNsdManager.discoverServices(SERVICE_TYPE, NsdManager.PROTOCOL_DNS_SD,
				mDiscoveryListener);
	}

	public void stopDiscovery() {
		mNsdManager.stopServiceDiscovery(mDiscoveryListener);
	}

	public NsdServiceInfo getChosenServiceInfo() {
		return mService;
	}

	public void tearDown() {
		mNsdManager.unregisterService(mRegistrationListener);
	}
}
