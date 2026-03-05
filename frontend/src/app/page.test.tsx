import { render, screen } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  it('アプリケーション名 "Brain" を表示する', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Brain' }),
    ).toBeInTheDocument();
  });
});
