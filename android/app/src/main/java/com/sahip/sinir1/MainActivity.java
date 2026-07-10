package com.sahip.sinir1;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Uygulama kendi WebView'ini kontrol ettiği için stüdyo intro videosu
    // dokunuş beklemeden sesli otomatik oynayabilsin.
    this.bridge.getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
  }
}
