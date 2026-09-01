# 📚 高校生向け宿題管理Webアプリ

高校生が効率的に宿題を管理できるWebアプリケーションです。

## ✨ 主な機能

### 基本機能
- ✅ 宿題の追加・編集・削除
- ✅ 宿題の完了マーク機能
- ✅ 教科・内容・提出期限・優先度の登録
- ✅ スマホ対応のレスポンシブデザイン

### 今後追加予定の機能
- 🔄 ソート・フィルタ機能
- 📊 統計・ダッシュボード
- 🔔 リマインダー通知
- 👥 ユーザー認証
- クラウド同期

## 🚀 クイックスタート

### 必要な環境
- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/0908ryutaro-tech/homework-management-app.git
cd homework-management-app

# バックエンド セットアップ
cd backend
npm install
npm start

# 別のターミナルでフロントエンド セットアップ
cd frontend
npm install
npm start
```

バックエンド：`http://localhost:5000`
フロントエンド：`http://localhost:3000`

## 📁 プロジェクト構造

```
homework-management-app/
├── backend/              # Express サーバー
│   ├── server.js        # メインサーバー
│   ├── db.js            # SQLite接続
│   ├── package.json
│   └── homework.db      # データベース（自動生成）
│
├── frontend/            # React アプリ
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── HomeworkForm.jsx      # 宿題追加・編集フォーム
│   │   │   ├── HomeworkList.jsx      # 宿題一覧表示
│   │   │   └── HomeworkItem.jsx      # 宿題アイテム
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🛠️ 技術スタック

- **フロントエンド**：React 18, Tailwind CSS
- **バックエンド**：Node.js, Express
- **データベース**：SQLite
- **API**：REST API

## 📝 使用方法

1. **宿題を追加する**
   - 「新規宿題」ボタンをクリック
   - 教科、内容、提出期限、優先度を入力
   - 「保存」をクリック

2. **宿題を編集する**
   - 編集したい宿題の「編集」ボタンをクリック
   - 情報を修正して「保存」をクリック

3. **宿題を削除する**
   - 削除したい宿題の「削除」ボタンをクリック

4. **宿題を完了にする**
   - チェックボックスをクリックして完了状態を切り替え

## 📱 対応デバイス

- PC（デスクトップ）
- タブレット
- スマートフォン

## 📄 ライセンス

MIT License

## 👨‍💻 作成者

0908ryutaro-tech
