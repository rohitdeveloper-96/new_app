import { stores } from '../store/store'
import React from 'react';
import { render, fireEvent, screen, getByTestId, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import HomeScreen from '../screens/HomeScreen'
describe("Initial render the Login Component", () => {
    const UserList = [
        {
            "id": 1,
            "name": "admin",
            "email": "admin123@gmail.com",
            "password": "admin",
            "isAdmin": "true"
        },
    ]
    it("render the userlist of datas", async () => {
        await render(<Provider store={stores}>
            <HomeScreen />
        </Provider>, { wrapper: Router })
        expect(UserList).not.toHaveLength(0)
    })
    it('display an error message when api call fails', async () => {
        await render(<Provider store={stores}>
             <HomeScreen />
        </Provider>, { wrapper: Router })
        const listElement = await screen.queryByText('Fail to Fetch Data')
        expect(listElement).toBeNull()
    })
})