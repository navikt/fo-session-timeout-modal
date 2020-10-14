import React from 'react';
import { render } from '@testing-library/react';
import TimeoutModal from './TimeoutModal';

test('Rendrer modalelementet', () => {
  const { getByText } = render(<TimeoutModal visDemo={true} />);
  const tekstElement = getByText(/Sesjonen din har utløpt/i);
  expect(tekstElement).toBeInTheDocument();
});
