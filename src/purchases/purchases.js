/* PERISHED — GOOGLE PLAY SATIN ALMA KATMANI
   Bölüm 1 sonrası tek seferlik "devam" ürünü (managed product / one-time,
   abonelik değil). Play Console'da AYNI product ID ile bir yönetilen ürün
   oluşturulmalı: Monetize with Play > Products > In-app products.

   Bu eklenti SADECE gerçek bir Android cihazda, uygulama Play Store'dan
   (en azından bir test kanalından) yüklendiğinde çalışır — dev sunucusunda
   veya sideload edilmiş bir APK'de purchaseProduct() hata fırlatır. */

import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

export const EPISODE2_PRODUCT_ID = "episode2_unlock";

const UNLOCK_KEY = "sinir1_ep2_unlocked";

export function isUnlockedLocal() {
  try { return localStorage.getItem(UNLOCK_KEY) === "1"; } catch (e) { return false; }
}

function markUnlockedLocal() {
  try { localStorage.setItem(UNLOCK_KEY, "1"); } catch (e) {}
}

// Uygulama açılışında bir kere çağrılır: kullanıcı daha önce satın aldıysa
// (telefon değişse/uygulama yeniden yüklense bile) Play'in satın alma
// geçmişinden bunu tekrar tespit edip yerel bayrağı senkronlar — kullanıcı
// tekrar ödeme yapmak zorunda kalmaz.
export async function restorePurchases() {
  try {
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.INAPP });
    const owned = purchases.some((p) => p.productIdentifier === EPISODE2_PRODUCT_ID);
    if (owned) markUnlockedLocal();
    return owned || isUnlockedLocal();
  } catch (e) {
    // Play Store dışı bir ortam (dev sunucu, sideload) — sessizce yerel duruma düş.
    return isUnlockedLocal();
  }
}

// Satın alma akışını başlatır (Play'in native ödeme ekranını açar).
// Başarılıysa yerel "açık" bayrağını işaretler ve işlemi döner.
export async function purchaseEpisode2() {
  const tx = await NativePurchases.purchaseProduct({
    productIdentifier: EPISODE2_PRODUCT_ID,
    productType: PURCHASE_TYPE.INAPP,
  });
  markUnlockedLocal();
  return tx;
}
