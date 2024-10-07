"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    try {
      // PythonバックエンドにPOSTリクエストを送信
      const response = await fetch(
        "https://thawing-dusk-43676-eb890e8ae523.herokuapp.com/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // 入力テキストを送信
          body: JSON.stringify({ text: inputText }),
        }
      );

      // レスポンスのステータスコードを確認
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // レスポンスをJSON形式で受け取る
      const data = await response.json();
      // デバッグ: 返されたデータを確認
      console.log(data);

      // 受け取った翻訳結果をステートに保存
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("エラーが発生しました：", error);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>英語から日本語に翻訳</h1>
      <div className={styles.inputText}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="英語のテキストを入力"
        />
        <button onClick={handleTranslate}>翻訳</button>
        {translatedText && (
          <div className={styles.result}>
            <h2>翻訳結果:</h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
