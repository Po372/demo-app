import React from 'react';

export const Loading = () => {
  return (
    <div className="bg-cyan-600 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-[350px] h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-4"></div>
          <p className="text-xl font-semibold text-cyan-600">読み込み中...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;