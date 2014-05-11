package br.com.cirocosta.anncontroller;

/**
 * Interface for NSD Related stuff
 * @author ciro
 */
public interface NsdInterface {
	/**
	 * Callback to be called everytime that a new service comes.
	 * @param URL string
	 */
	public void onDesiredServiceResolved(String url);
}
