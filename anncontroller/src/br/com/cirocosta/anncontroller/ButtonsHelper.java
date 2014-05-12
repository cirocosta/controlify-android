package br.com.cirocosta.anncontroller;

import android.app.Activity;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.Button;

/**
 * Checa a UI e verifica se os botões estão de fato sendo apertados ou nao.
 * Devemos então passar uma atividade para este helper de modo que o mesmo
 * possa obter as referencias para as views da atividade as quais desejamos
 * ter contato.
 */
public class ButtonsHelper {

	// movement buttons
	private Button movF, movR, movB, movL;
	// action buttons
	private Button actA, actB, actC, actD;
	
	private Activity mActv;
	private DeviceInterface mDi;
	
	
	public ButtonsHelper(Activity actv, DeviceInterface di) {
		this.mActv = actv;
		this.mDi = di;
	}
	
	static {
		OnTouchListener mtTouchListener = new OnTouchListener() {
			
			@Override
			public boolean onTouch(View v, MotionEvent event) {
				switch(event.getAction()) {
				case MotionEvent.ACTION_DOWN:
					break;
					
				case MotionEvent.ACTION_UP:
					break;
				}
				
				return true;
			}
		};
	}
	
	private void setUi() {
		movF = (Button) this.mActv.findViewById(R.id.btn_movF);
		movR = (Button) this.mActv.findViewById(R.id.btn_movR);
		movB = (Button) this.mActv.findViewById(R.id.btn_movB);
		movL = (Button) this.mActv.findViewById(R.id.btn_movL);
		
		actA = (Button) this.mActv.findViewById(R.id.btn_actA);
		actB = (Button) this.mActv.findViewById(R.id.btn_actB);
		actC = (Button) this.mActv.findViewById(R.id.btn_actC);
		actD = (Button) this.mActv.findViewById(R.id.btn_actD);
	}
	
	
	
}
