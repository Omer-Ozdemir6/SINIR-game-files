import { useEffect, useState } from "react";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
import { styles as S } from "../styles/theme";
import { t } from "../i18n";
import { EPISODE2_PRODUCT_ID, purchaseEpisode2 } from "../purchases/purchases";
import { IS_RELEASE } from "../engine/constants";

/* BÖLÜM 1 SONU — ÖDEME DUVARI
   Oyuncu K-5'e (bölüm 2) geçmeden önce görür. "Ödeme Yap" gerçek Google
   Play satın alma akışını açar (sadece Play Store'dan yüklenmiş bir
   derlemede çalışır); "Ana Menüye Dön" ile geri çekilebilir. */
export default function PaywallScreen({ onUnlocked, onMainMenu }) {
  const [status, setStatus] = useState("idle"); // idle | processing | error
  const [priceString, setPriceString] = useState(null);

  useEffect(() => {
    let alive = true;
    NativePurchases.getProduct({ productIdentifier: EPISODE2_PRODUCT_ID, productType: PURCHASE_TYPE.INAPP })
      .then(({ product }) => { if (alive) setPriceString(product?.priceString || null); })
      .catch(() => {}); // Play dışı ortamda (dev/sideload) sessizce geç
    return () => { alive = false; };
  }, []);

  const pay = async () => {
    if (status === "processing") return;
    setStatus("processing");
    try {
      await purchaseEpisode2();
      onUnlocked();
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div style={S.warnRoot} className="s1-fadein">
      <div style={S.warnBody}>
        <p style={{ ...S.warnText, fontSize: 16, color: "#e8e2c9", letterSpacing: "0.06em" }}>
          {t("paywall.congrats")}
        </p>
        <p style={S.warnText}>{t("paywall.body")}</p>
        {priceString && (
          <p style={{ ...S.warnText, fontSize: 12, color: "#8f8a70", textAlign: "center" }}>
            {priceString}
          </p>
        )}
        {status === "error" && (
          <p style={{ ...S.warnText, color: "#c9756a", fontSize: 12, textAlign: "center" }}>
            {t("paywall.error")}
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <button
          className="s1-btn s1-mm"
          style={{ ...S.warnContinue, opacity: status === "processing" ? 0.6 : 1, pointerEvents: status === "processing" ? "none" : "auto" }}
          onClick={pay}
        >
          {status === "processing" ? t("paywall.processing") : t("paywall.pay")}
        </button>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onMainMenu}>
          {t("paywall.mainMenu")}
        </button>

        {/* Geliştirici modu: Play Console henüz kurulmadıysa akışı test etmek için */}
        {!IS_RELEASE && (
          <button
            className="s1-btn"
            style={{ ...S.menuClose, fontSize: 9, opacity: 0.5, marginTop: 8 }}
            onClick={onUnlocked}
          >
            (dev) test olarak aç
          </button>
        )}
      </div>
    </div>
  );
}
