import React, { useState, useEffect } from 'react';
import HomeworkForm from './components/HomeworkForm';
import HomeworkList from './components/HomeworkList';
import {
  getHomeworks,
  addHomework,
  updateHomework,
  deleteHomework,
  toggleHomeworkComplete,
  searchHomeworks
} from './utils/storage';
import './index.css';

function App() {
  const [homeworks, setHomeworks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHomework, setEditingHomework] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, today, tomorrow, overdue
  const [loading, setLoading] = useState(true);

  // 初期化
  useEffect(() => {
    loadHomeworks();
    setLoading(false);
  }, []);

  const loadHomeworks = () => {
    const data = getHomeworks();
    setHomeworks(data);
  };

  const handleAddHomework = (formData) => {
    addHomework(formData);
    loadHomeworks();
    setShowForm(false);
  };

  const handleUpdateHomework = (formData) => {
    updateHomework(editingHomework.id, formData);
    loadHomeworks();
    setEditingHomework(null);
    setShowForm(false);
  };

  const handleDeleteHomework = (id) => {
    deleteHomework(id);
    loadHomeworks();
  };

  const handleToggleComplete = (id) => {
    toggleHomeworkComplete(id);
    loadHomeworks();
  };

  const handleEditHomework = (homework) => {
    setEditingHomework(homework);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingHomework) {
      handleUpdateHomework(formData);
    } else {
      handleAddHomework(formData);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingHomework(null);
  };

  // フィルタリング
  const getFilteredHomeworks = () => {
    let filtered = homeworks;

    // 検索フィルタ
    if (searchQuery.trim()) {
      filtered = searchHomeworks(searchQuery);
    }

    // 期限フィルタ
    if (filter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filter === 'today') {
        filtered = filtered.filter(hw => {
          const dueDate = new Date(hw.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime() && !hw.completed;
        });
      } else if (filter === 'tomorrow') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        filtered = filtered.filter(hw => {
          const dueDate = new Date(hw.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === tomorrow.getTime() && !hw.completed;
        });
      } else if (filter === 'overdue') {
        filtered = filtered.filter(hw => {
          const dueDate = new Date(hw.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() < today.getTime() && !hw.completed;
        });
      }
    }

    return filtered;
  };

  const filteredHomeworks = getFilteredHomeworks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span>📚</span> 宿題管理
            </h1>
            <button
              onClick={() => {
                setEditingHomework(null);
                setShowForm(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition duration-200 text-sm sm:text-base"
            >
              ➕ 追加
            </button>
          </div>

          {/* 検索バー */}
          <input
            type="text"
            placeholder="検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          {/* フィルタボタン */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
                filter === 'today'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔥 今日
            </button>
            <button
              onClick={() => setFilter('tomorrow')}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
                filter === 'tomorrow'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⏰ 明日
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
                filter === 'overdue'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⚠️ 期限切れ
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <HomeworkList
          homeworks={filteredHomeworks}
          onEdit={handleEditHomework}
          onDelete={handleDeleteHomework}
          onToggle={handleToggleComplete}
          loading={loading}
        />
      </main>

      {/* フォームモーダル */}
      {showForm && (
        <HomeworkForm
          onSubmit={handleFormSubmit}
          initialData={editingHomework}
          onCancel={handleFormCancel}
        />
      )}

      {/* フッター */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="max-w-2xl mx-auto text-center text-xs text-gray-500">
          <p>📱 データはこのブラウザに自動保存されます</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
