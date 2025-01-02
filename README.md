# AnswerCarefully Viewer

日本語LLM 出力の安全性・適切性に特化したインストラクション・データ[AnswerCarefullyデータセット](https://llmc.nii.ac.jp/answercarefully-dataset/)を閲覧用のHTMLファイルに変換するツールです。

AnswerCarefully バージョン2.0（ACv2）で動作を確認しています。

## Development

```
$ git clone https://github.com/vzvu3k6k/answer-carefully-viewer.git
$ cd answer-carefully-viewer

# ブラウザからローカルのファイルシステムのindex.htmlを開くと、CORSの制限によりmain.jsを参照できません。
# 以下のように適当なHTTPサーバーを起動して、HTTPサーバーを経由してindex.htmlを開いてください。
$ python -m http.server 8000
$ open localhost:8000
```
