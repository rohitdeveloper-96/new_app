
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import LoginScreen from '../screens/Login';
import { stores } from '../store/store'

describe("Login Form Component", () => {
    const adminUserList = [
        {
            "id": 1,
            "name": "admin",
            "email": "admin123@gmail.com",
            "password": "admin",
            "isAdmin": "true"
        },
    ]
    it("render the adminlist of datas", async () => {
        await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router })
        expect(adminUserList).not.toHaveLength(0)
    })
    it('display an error message when api call fails', async () => {
        await render(<Provider store={stores}>
            <LoginScreen />
        </Provider>, { wrapper: Router })
        const listElement = await screen.queryByText('Fail to Fetch Data')
        expect(listElement).toBeNull()
    })

});