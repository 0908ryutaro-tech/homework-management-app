import React from 'react';

const HomeworkItem = ({ homework, onEdit, onDelete, onToggle }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴 高';
      case 'medium':
        return '🟡 中';
      case 'low':
        return '🟢 低';
      default:
        return priority;
    }
  };

  const isOverdue = new Date(homework.dueDate) < new Date() && !homework.completed;
  const isToday = new Date(homework.dueDate).toDateString() === new Date().toDateString();
  const isTomorrow = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(homework.dueDate).toDateString() === tomorrow.toDateString();
  })();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return '📅 今日';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return '📅 明日';
    }
    return date.toLocaleDateString('ja-JP', {
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow border-l-4 transition duration-200 ${
        homework.completed
          ? 'border-l-gray-300 opacity-60'
          : isOverdue
          ? 'border-l-red-500'
          : getPriorityColor(homework.priority)
      }`}
    >
      <div className="flex items-start gap-3">
        {/* チェックボックス */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={homework.completed}
            onChange={() => onToggle(homework.id)}
            className="w-6 h-6 text-blue-600 rounded cursor-pointer accent-blue-500"
          />
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* 教科バッジ */}
            <span className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
              {homework.subject}
            </span>

            {/* 優先度バッジ */}
            <span className="inline-block text-xs font-semibold px-2 py-1 rounded border border-gray-300">
              {getPriorityBadge(homework.priority)}
            </span>

            {/* 期限警告 */}
            {isOverdue && (
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                ⚠️ 期限切れ
              </span>
            )}

            {/* 本日・明日表示 */}
            {!homework.completed && (isToday || isTomorrow) && (
              <span className="inline-block bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
                {isToday ? '🔥 本日' : '⏰ 明日'}
              </span>
            )}
          </div>

          {/* 宿題内容 */}
          <p
            className={`text-gray-700 mb-2 break-words text-sm sm:text-base ${
              homework.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {homework.content}
          </p>

          {/* 提出期限 */}
          <p
            className={`text-sm font-semibold mb-3 ${
              isOverdue ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {formatDate(homework.dueDate)}
          </p>

          {/* アクションボタン */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(homework)}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-3 rounded transition duration-200"
            >
              ✏️ 編集
            </button>
            <button
              onClick={() => {
                if (window.confirm('この宿題を削除しますか？')) {
                  onDelete(homework.id);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded transition duration-200"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkItem;
