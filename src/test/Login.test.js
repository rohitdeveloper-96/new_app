import { getByText } from '@testing-library/react'
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import LoginScreen from '../screens/Login';
import Header from '../components/Header';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { Typography } from '@mui/material';

const mockStore = configureStore([])
describe("Login Form Component", () => {
    // it("render the Login Component", async () => {
    //     const store = mockStore({})
    //     store.dispatch = jest.fn();
    //     const { getById } = await render(<Provider store={store}>
    //         <LoginScreen />
    //     </Provider>, { wrapper: BrowserRouter })
    //   const emailInput = getById('email');
    //     expect(emailInput.value).toBe("@")
    // })       
    it("render the Header", async () => {
        const store = mockStore({})
        store.dispatch = jest.fn();
        await render(<Provider store={store}>
            <LoginScreen />
        </Provider>, { wrapper: BrowserRouter })
        const StringElement = await screen.getByText("adminUserList")
        expect(StringElement.innerHTML).toBeUndefined()
    })

});