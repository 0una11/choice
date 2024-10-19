import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// 新增的測試：檢查按鈕功能
test('renders select button and checks its functionality', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /select/i }); // 確保按鈕名稱正確
  expect(buttonElement).toBeInTheDocument(); // 確保按鈕存在
  
  fireEvent.click(buttonElement); // 模擬按鈕點擊
  // 在這裡添加斷言來檢查按鈕點擊後的行為，如顯示結果等
});

