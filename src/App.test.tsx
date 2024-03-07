import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

test('renders the error messages if name, song, and key not added', async () => {
  render(<App />)

  fireEvent.click(screen.getByLabelText('ilmoittaudu'))

  await waitFor(() => {
    expect(screen.getByText(/Nimi on pakollinen/i)).toBeInTheDocument()
    expect(screen.getByText(/Biisi on pakollinen/i)).toBeInTheDocument()
    expect(screen.getByText(/Sävellaji on pakollinen/i)).toBeInTheDocument()
  })
})

test('displays entered values after submission', async () => {
  render(<App />)

  fireEvent.change(screen.getByLabelText('Nimi tai nimimerkki*'), { target: { value: 'John Doe' } })
  fireEvent.change(screen.getByLabelText('Biisi*'), { target: { value: '1' } })
  fireEvent.click(screen.getByLabelText('0'))

  fireEvent.click(screen.getByLabelText('ilmoittaudu'))

  await waitFor(
    () => {
      expect(screen.getByText(/Seuraavana vuorossa:/i)).toBeInTheDocument()
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
      expect(screen.getByText(/Bohemian Rhapsody - Queen/i)).toBeInTheDocument()
      expect(screen.getByText(/Sävellaji: 0/i)).toBeInTheDocument()
    },
    { timeout: 5000 },
  )
})
