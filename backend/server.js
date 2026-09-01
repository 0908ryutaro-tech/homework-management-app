const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== API エンドポイント =====

// 1. すべての宿題を取得
app.get('/api/homeworks', (req, res) => {
  db.all(
    `SELECT * FROM homeworks ORDER BY dueDate ASC`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// 2. 特定の宿題を取得
app.get('/api/homeworks/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    `SELECT * FROM homeworks WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Homework not found' });
        return;
      }
      res.json(row);
    }
  );
});

// 3. 新しい宿題を追加
app.post('/api/homeworks', (req, res) => {
  const { subject, content, dueDate, priority } = req.body;

  // バリデーション
  if (!subject || !content || !dueDate || !priority) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  db.run(
    `INSERT INTO homeworks (subject, content, dueDate, priority) VALUES (?, ?, ?, ?)`,
    [subject, content, dueDate, priority],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
        subject,
        content,
        dueDate,
        priority,
        completed: 0,
        createdAt: new Date().toISOString()
      });
    }
  );
});

// 4. 宿題を編集
app.put('/api/homeworks/:id', (req, res) => {
  const { id } = req.params;
  const { subject, content, dueDate, priority, completed } = req.body;

  // バリデーション
  if (!subject || !content || !dueDate || !priority) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  db.run(
    `UPDATE homeworks SET subject = ?, content = ?, dueDate = ?, priority = ?, completed = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [subject, content, dueDate, priority, completed ? 1 : 0, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Homework not found' });
        return;
      }
      res.json({ message: 'Homework updated successfully' });
    }
  );
});

// 5. 宿題の完了状態を切り替え
app.patch('/api/homeworks/:id/toggle', (req, res) => {
  const { id } = req.params;

  db.run(
    `UPDATE homeworks SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Homework not found' });
        return;
      }
      res.json({ message: 'Homework toggled successfully' });
    }
  );
});

// 6. 宿題を削除
app.delete('/api/homeworks/:id', (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM homeworks WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Homework not found' });
        return;
      }
      res.json({ message: 'Homework deleted successfully' });
    }
  );
});

// ===== ヘルスチェック =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
