import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from './App';

describe( 'App Counter', () => {

  test('Counter Elements should be present', () => {
    render(<App />)
    const incrementButton = screen.getByText(/Increment/i)
    const decrementButton = screen.getByText(/Decrement/i)
    const counterLabel = screen.getByText(/Counter:/i)
    let counterText = screen.getByTestId("counter-value")
    
    expect(incrementButton).toBeInTheDocument()
    expect(incrementButton).toBeEnabled()
    expect(decrementButton).toBeInTheDocument()
    expect(decrementButton).toBeDisabled()
    expect(counterLabel).toBeInTheDocument()
    expect(counterText).toHaveTextContent(0)
  })

  test('Increment increases value by 1 and enables decrement button present', () => {
    render(<App />)
    const incrementButton = screen.getByText(/Increment/i)
    const decrementButton = screen.getByText(/Decrement/i)
    const counterText = screen.getByTestId("counter-value")

    expect(counterText).toHaveTextContent(0)
    userEvent.click(incrementButton)
    expect(counterText).toHaveTextContent(1)
    expect(decrementButton).not.toBeDisabled()
  })

  test('Decrement decreases value by 1 and disables decrement button at 0', () => {
    render(<App />)
    const incrementButton = screen.getByText(/Increment/i)
    const decrementButton = screen.getByText(/Decrement/i)
    const counterText = screen.getByTestId("counter-value")

    expect(counterText).toHaveTextContent(0)
    userEvent.click(incrementButton)
    expect(counterText).toHaveTextContent(1)
    expect(decrementButton).not.toBeDisabled()
    userEvent.click(decrementButton)
    expect(counterText).toHaveTextContent(0)
    expect(decrementButton).toBeDisabled()
  })
})

describe('App Item List', () => {
  test('List Form Components render', () => {
    render(<App />)
    const listItemInput = screen.getByLabelText(/Create List Item/i)
    const addItemButton = screen.getByTestId("add-item")

    expect(listItemInput).toBeInTheDocument()
    expect(addItemButton).toBeInTheDocument()
  })

  test('User can add item to page', () => {
    render(<App />)
    const listItemInput = screen.getByLabelText(/Create List Item/i)
    const addItemButton = screen.getByTestId("add-item")

    expect(listItemInput).toHaveValue("")
    userEvent.type(listItemInput, "hello")
    expect(listItemInput).toHaveValue("hello")

    userEvent.click(addItemButton)
    expect(screen.getByText("hello")).toBeInTheDocument()
    expect(listItemInput).toHaveValue("")
  })

  test('User can remove item from page', () => {
    render(<App />)
    const listItemInput = screen.getByLabelText(/Create List Item/i)
    const addItemButton = screen.getByTestId("add-item")

    userEvent.type(listItemInput, "hello")
    userEvent.click(addItemButton)
    const newItem = screen.getByText("hello")
    expect(newItem).toBeInTheDocument()
    
    const removeButton = screen.getByTestId('remove-item0')
    userEvent.click(removeButton)
    expect(newItem).not.toBeInTheDocument()
  })
})
