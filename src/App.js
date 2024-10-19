import React, { useState } from 'react';
import './App.css';  // 假設已經在App.css中設置樣式

function ChoiceMaker() {
  const [input, setInput] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [history, setHistory] = useState([]);  // 新增歷史紀錄

  // 當輸入框改變時更新值
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 當按下Enter時，將當前輸入加入選項
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      if (!choices.includes(input.trim())) {
        setChoices([...choices, input.trim()]);  // 添加新選項
        setInput('');  // 清空輸入框
      } else {
        alert('此選項已經存在');
      }
    }
  };

  // 刪除指定選項
  const handleDeleteChoice = (indexToDelete) => {
    setChoices(choices.filter((_, index) => index !== indexToDelete));
  };

   // 清空所有選項
   const handleClearChoices = () => {
    setChoices([]);
    setSelectedChoice('');
  };

  // 清空歷史紀錄
  const handleClearHistory = () => {
    setHistory([]);
  };

  // 隨機選擇選項並保存至歷史紀錄，且清空選項以便重新開始
  const handleMakeChoice = () => {
    if (choices.length === 0) {
      alert('請先輸入一些選項再進行選擇');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * choices.length);
    const choice = choices[randomIndex];
    setSelectedChoice(choice);

    // 保存選擇到歷史紀錄，包含當前選項和結果
    setHistory([...history, { selected: choice, options: [...choices] }]);
  };

  // 顯示當時的選項
  const handleShowOptions = (options) => {
    alert(`當時的選項:\n${options.join('\n')}`);
  };

  return (
    <div className="container">
      <h1>隨機選擇器</h1>
      <p className="description">你有選擇障礙嗎，我幫你選擇！</p>
      <p className="description">(輸入選項後Enter確認，確認後按選擇產出結果)</p>
      <input 
        type="text" 
        id="optionInput" 
        placeholder="輸入選項" 
        value={input} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown} 
        className="input-field"  // 使用CSS class
      />
      <div className="button-container">
        <button className="select-button" onClick={handleMakeChoice}>選擇</button>
        <button className="clear-button" onClick={handleClearChoices}>清除選項</button>
      </div>
      <div className="result" id="result">
        {selectedChoice && <h2>我的選擇是: {selectedChoice}</h2>}
      </div>

      {/* 顯示當前選項 */}
      {choices.length > 0 && (
        <div className="choice-list">
          <h3>選項：</h3>
          <ul>
            {choices.map((choice, index) => (
              <li key={index}>
                {choice} 
                <button onClick={() => handleDeleteChoice(index)} className="delete-button">刪除</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 顯示歷史紀錄 */}
      {history.length > 0 && (
        <div className="history-list">
          <h3>歷史紀錄：</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <span onClick={() => handleShowOptions(item.options)} className="history-item">
                  {item.selected}
                </span>
              </li>
            ))}
          </ul>
          {/* 清除歷史紀錄按鈕 */}
          <button className="delete-history-button" onClick={handleClearHistory}>清除歷史紀錄</button>
        </div>
      )}
    </div>
  );
}

export default ChoiceMaker;
