import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContextProvider } from "./context";
import { CartHeader } from "./Components/Header/CartHeader";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Filters } from "./Components/Filters/Filters";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("APP TESTS", () => {
    it("Test show basket", () => {
        render(
            <MemoryRouter>
                <ContextProvider>
                    <CartHeader />
                </ContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByText(/корзина/i)).toBeInTheDocument();
    });
    it("Test navigation", () => {
        render(
            <MemoryRouter>
                <ContextProvider>
                    <Header />
                </ContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
    it("Test categories", () => {
        render(
            <MemoryRouter>
                <ContextProvider>
                    <Filters />
                </ContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByText("Все категории")).toBeInTheDocument();
    });
    it("test search filter", () => {
        render(
            <MemoryRouter>
                <ContextProvider>
                    <Filters />
                </ContextProvider>
            </MemoryRouter>
        );
        const input = screen.getByRole("searchbox");
        fireEvent.change(input, {
            target: { value: "Рос" },
        });
        expect(input).toHaveValue("Рос");
    });
    it("test admin list", () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        const mainPage = screen.getByTestId("main-link");
        const catalogPage = screen.getByTestId("catalog-link");
        userEvent.click(catalogPage);
        expect(screen.getByText("Косметика и гигиена")).toBeInTheDocument();
        userEvent.click(mainPage);
        expect(screen.getByTestId("main-page")).toBeInTheDocument();
    });
    it("test error page", () => {
        render(
            <MemoryRouter initialEntries={["/asdasf"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("error-page")).toBeInTheDocument();
    });
    it("test basket", () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        const cartPage = screen.getByTestId("cart-link");
        userEvent.click(cartPage);
        expect(screen.getByText(/корзина/i)).toBeInTheDocument();
    });
    it("min price correct", () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const minPrice = screen.getByTestId("min-price");
        fireEvent.change(minPrice, {
            target: { value: 123 },
        });
        expect(minPrice).toHaveValue(123);
    });
    it("min price correct < 0", () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const minPrice = screen.getByTestId("min-price");
        fireEvent.change(minPrice, {
            target: { value: -123 },
        });
        expect(minPrice).toHaveValue(0);
    });
    it("min price > max price", () => {
        render(
            <MemoryRouter>
                <Filters />
            </MemoryRouter>
        );
        const minPrice = screen.getByTestId("min-price");
        const maxPrice = screen.getByTestId("max-price");
        fireEvent.change(minPrice, {
            target: { value: 1000 },
        });
        fireEvent.change(maxPrice, {
            target: { value: 500 },
        });
        expect(minPrice).toHaveValue(500);
    });
});
